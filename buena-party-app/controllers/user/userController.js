const { getEventByUserId, deleteEvent } = require('../../models/eventModel');
const { insertUser, getUsers, changeUser, removeUser, resetAutoIncrement, getUserById, changePassword, getUserByEmail } = require('../../models/userModel');
const User = require('../../models/userModel');

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

const resetPassword = async (req, res) => {
    const { e_mail, newPassword } = req.body;

    try {
        const user = await getUserByEmail(e_mail, (error, user) => {
            if (error) {
                console.error('Erro ao buscar usuário por e-mail:', error);
                return res.status(500).json({ error: 'Erro na redefinição de senha.' });
            }

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Chama a função changePassword para atualizar a senha no banco de dados
            changePassword(user.id, newPassword, (error) => {
                if (error) {
                    console.error('Erro na atualização de senha:', error);
                    return res.status(500).json({ error: 'Erro na atualização de senha.' });
                }

                return res.status(200).json({ message: 'Senha do usuário atualizada com sucesso!' });
            });
        });
    } catch (error) {
        console.error('Erro na redefinição de senha:', error);
        return res.status(500).json({ error: 'Erro na redefinição de senha.' });
    }
};


const deleteUser = (req, res) => {
    const userId = req.params.id;

    getEventByUserId(userId, (error, events) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao verificar eventos associados ao usuário.' });
        } else {
            events.forEach((evento) => {
                deleteEvent(evento.id, (error, deletedEvent) => {
                    if (error) {
                        console.error(`Erro ao excluir evento ${evento.id} associado ao usuário ${userId}: ${error}`);
                    } else {
                        console.log(`Evento ${evento.id} associado ao usuário ${userId} excluído com sucesso.`);
                    }
                });
            });
        }
    })

    removeUser(userId, (error, deletedUser) => {
        if (error) {
            res.status(500).json({ error: `Erro ao excluir o usuário ${deletedUser.nome}: ${error}`});
        } else {
            resetAutoIncrement()
            res.status(200).json({ message: `Usuário ${deletedUser.nome} excluído com sucesso!`});
        }
    })
}

module.exports = { registerUser, listUsers, updateUser, deleteUser, showUser, resetPassword };