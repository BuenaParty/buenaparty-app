
//EndPoint para atualizar os dados do usuário
app.put('/update/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { nome, email, telefone, senha } = req.body;
  
    try {
      // Exemplo de consulta SQL para atualizar o usuário
      await db.promise().query('UPDATE USUARIO SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?', [ // aqui vou alterar este "e_mail para ver se esta certo"
        nome,
        email,
        telefone,
        senha,
        userId
      ]);
  
      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar o usuário: ', error);
      res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
  });