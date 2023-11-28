const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const router = express.Router();

console.log('Script auth.js está sendo executado.');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);
console.log('OAuth2 client configurado com sucesso.');

router.get('/auth/google/callback', async (req, res) => {
  console.log('Callback route called.');
  const code = req.query.code;
  console.log('Received authorization code:', code);

  if (!code) {
    console.error('Authorization code is missing or undefined.');
    return res.status(400).send('Authorization code is missing or undefined.');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens obtained successfully:', tokens);
    res.send('Autenticação bem-sucedida!');
  } catch (error) {
    console.error('Error obtaining tokens:', error);
    res.status(500).send('Erro ao obter tokens.');
  }
});




router.get('/auth/google', (req, res) => {
  console.log('Rota /auth/google chamada.');
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });

  res.redirect(authUrl);
});

// Adicione este console.error para verificar se a rota está sendo registrada corretamente
router.get('*', (req, res) => {
  console.error('Nenhuma rota correspondente encontrada para:', req.url);
  res.status(404).send('Página não encontrada');
});




router.get('/auth/success', (req, res) => {
  res.send('Autenticação bem-sucedida!');
});

router.get('/auth/error', (req, res) => {
  res.status(500).send('Erro ao obter tokens.');
});

module.exports = router;