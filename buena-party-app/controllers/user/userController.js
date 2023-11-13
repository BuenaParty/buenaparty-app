const { insertUser, getUsers, changeUser, removeUser, resetAutoIncrement, getUserById } = require('../../models/userModel');

const registerUser = (req, res) => {
    const user = req.body;

    
    insertUser(user, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro ao registrar o usuário ${user.nome}: ${error}` });
        } else {
            res.status(201).json({ message: `Usuário ${user.nome} registrado com sucesso!` });
        }
    });
};

const listUsers = (req, res) => {
    getUsers((error, users) => {
        if (error) {
            res.status(500).json({ error: `Erro ao listar os usuários: ${error}`});
        } else {
            res.status(200).json(users);
        }
    });
};

const showUser = (req, res) => {
    const userId = req.params.id; // Obtém o ID do usuário da URL

    getUserById(userId, (error, user) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário.' });
        } else if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        } else {
            res.status(200).json(user);
        }
    });
}

const updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    
    changeUser(userId, updatedUser, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro ao atualizar os registros do usuário ${updatedUser.nome}: ${error}`});
        } else {
            res.status(200).json({ message: `Registros do usuário ${updatedUser.nome} atualizados com sucesso!`});
        }
    })
};

const deleteUser = (req, res) => {
    const userId = req.params.id;

    removeUser(userId, (error, deletedUser) => {
        if (error) {
            res.status(500).json({ error: `Erro ao excluir o usuário ${deletedUser.nome}: ${error}`});
        } else {
            resetAutoIncrement()
            res.status(200).json({ message: `Usuário ${deletedUser.nome} excluído com sucesso!`});
        }
    })
}

module.exports = { registerUser, listUsers, updateUser, deleteUser, showUser };