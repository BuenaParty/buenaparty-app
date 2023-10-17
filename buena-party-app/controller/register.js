
// EndPoint de registro do usuário
app.post('/register/user', async (req, res) => {
    try {
      const { nome, email, telefone, senha } = req.body;
  
      // Validação do e-mail
      const existenteUser = await db.promise().query('SELECT * FROM USUARIO WHERE USUARIO.e_mail = ?', [email]);
  
      if (existenteUser[0].length > 0) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado!' });
      }
  
      await db.promise().query('INSERT INTO USUARIO (nome, senha, e_mail, telefone) VALUES (?, ?, ?, ?)', [
        nome,
        senha,
        email,
        telefone,
      ]);
  
      return res.status(200).json({ message: 'Usuário cadastrado com sucesso!', nome, senha, email, telefone });
    } catch (error) {
      console.error('Erro no usuário: ', error);
      return res.status(500).json({ error: 'Erro ao cadastrar o usuário!' });
    }
  });