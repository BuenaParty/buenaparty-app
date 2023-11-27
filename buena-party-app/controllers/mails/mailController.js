const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../../db');

const sendPasswordResetEmail = (req, res) => {
    const { e_mail } = req.body;

    db.get('SELECT * FROM usuario WHERE e_mail = ?', [e_mail], (error, user) => {
        if (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else if (!user) {
            res.status(400).json({ error: 'Usuário não encontrado' });
        } else {
            // Gera um token de redefinição de senha
            const token = crypto.randomBytes(20).toString('hex');

            // Armazena o token e a hora de expiração
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

            // Configura o transporte de e-mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'buenaparty23@gmail.com', // Aqui colocaremos o Gmail da empresa Buena-party
                    pass: '#12BParty34#'           // e a senha do Gmail
                }
            });

            // Configura as opções de e-mail
            const mailOptions = {
                from: 'buenaparty23@gmail.com', // Aqui também colocaremos o Gmail do Buena-party
                to: `${user.email}`,
                subject: 'Link para Redefinição de Senha', // Assunto do E-mail
                text: `Você está recebendo isso porque você (ou outra pessoa) solicitou a redefinição da senha para sua conta.\n\n` +
                `Clique no link a seguir, ou cole este em seu navegador para completar o processo dentro de uma hora:\n\n` +
                `http://localhost:3000/reset/${token}\n\n` +
                `Se você não solicitou isso, por favor ignore este e-mail e sua senha permanecerá inalterada.\n`
            };

            // Envia o e-mail
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('Houve um erro: ', err);
                } else {
                    console.log('Aqui está a resposta: ', response);
                    res.status(200).json('Recuperação de e-mail enviado');
                }
            });
        }
    });
};

module.exports = { sendPasswordResetEmail };
