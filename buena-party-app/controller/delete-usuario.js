
// EndPoint para excluir um usuário por ID
app.delete('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Verificar se o usuário existe
      const [userRows] = await db.promise().query('SELECT * FROM USUARIO WHERE id = ?', [userId]);
  
      if (userRows.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Se o usuário existe, exclua-o do banco de dados
      await db.promise().query('DELETE FROM USUARIO WHERE id = ?', [userId]);
  
      return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir o usuário: ', error);
      return res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
  });
  