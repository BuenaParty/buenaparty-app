
//EndPoint para logar
app.post('/login', async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      const [rows] = await db.promise().query('SELECT USUARIO.id, USUARIO.nome, USUARIO.senha FROM USUARIO WHERE USUARIO.e_mail = ?', [email]);
  
      if (rows.length === 0 || rows[0].senha !== senha) {
        return res.status(401).json({ error: 'Suas credenciais são inválidas' });
      }
  
      const token = 'logado-pai';
      const id = rows[0].id;
      const nome = rows[0].nome;
  
      return res.status(200).json({ id, nome, token });
  
    } catch (error) {
      console.error('Erro ao logar: ', error);
      return res.status(500).json({ error: 'Erro no lado do servidor' });
    }
  });