const crypto = require('crypto');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const { google } = require('googleapis');
const db = require('../../db');
require('dotenv').config();

const sendPasswordResetEmail = async (req, res) => {
    const { e_mail } = req.body;

    try {
        const user = await getUserByEmail(e_mail);

        if (!user) {
            console.error(`Usuário não encontrado para o e-mail ${e_mail}`);
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Gera um token de redefinição de senha
        const token = crypto.randomBytes(20).toString('hex');

        // Armazena o token e a hora de expiração no banco de dados
        await storeResetToken(user.id, token);

        // Configura o transporte de e-mail com OAuth 2.0
        const transporter = createTransporter();

        // Configura as opções de e-mail
        const mailOptions = {
            from: 'buenaparty23@gmail.com',
            to: `${user.e_mail}`,
            subject: 'Link para Redefinição de Senha',
            text: `Você está recebendo isso porque você (ou outra pessoa) solicitou a redefinição da senha para sua conta.\n\n` +
                `Clique no link a seguir, ou cole este em seu navegador para completar o processo dentro de uma hora:\n\n` +
                `http://localhost:3000/reset/${token}\n\n` +
                `Se você não solicitou isso, por favor ignore este e-mail e sua senha permanecerá inalterada.\n`,
        };

        // Envia o e-mail
        await sendEmail(transporter, mailOptions);

        console.log(`E-mail de redefinição enviado com sucesso para ${user.e_mail}`);
        return res.status(200).json('Recuperação de e-mail enviado');
    } catch (error) {
        console.error('Houve um erro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


const getUserByEmail = (e_mail) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM usuario WHERE e_mail = ?', [e_mail], (error, user) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
};

const storeResetToken = (userId, token) => {
    db.run('UPDATE usuario SET reset_token = ? WHERE id = ?', [token, userId], (error) => {
        if (error) {
            console.error('Erro ao armazenar token de redefinição de senha:', error);
        } else {
            console.log('Token de redefinição de senha armazenado com sucesso.');
        }
    });
};


const createTransporter = () => {
    // Configuração do transporte Nodemailer
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
          },
        debug: true,
    });
};

const sendEmail = (transporter, mailOptions) => {
    // Envio do e-mail
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                reject(error);
            } else {
                console.log('E-mail enviado com sucesso:', info);
                resolve(info);
            }
        });
    });
};

module.exports = { sendPasswordResetEmail };
