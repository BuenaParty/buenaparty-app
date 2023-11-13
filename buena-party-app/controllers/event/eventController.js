const { 
    getEvents, 
    insertEvent, 
    updateEvent, 
    deleteEvent, 
    resetAutoIncrement, 
    getEventById, 
    getEventByUserId, 
    addGuestToEvent, 
    getGuestsByEventId, 
    removeGuestFromEvent, 
    getInviteCodeByEventId, 
    getEventByInviteCode 
} = require('../../models/eventModel');

const listEvents = (req, res) => {
    getEvents((error, result) => {
        if (error) {
            res.status(500).json({ error: `Erro no servidor: ${error}` });
        } else {
            res.status(200).json({ result });
        }
    });
}

const showInviteCode = (req, res) => {
    const eventId = req.params.id; // Obtém o ID do evento a partir dos parâmetros da rota

    getInviteCodeByEventId(eventId, (error, inviteCode) => {
        if (error) {
            console.error('Erro ao recuperar o código de convite:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (inviteCode !== null) {
                res.json({ code: inviteCode });
            } else {
                res.status(404).json({ error: 'Evento não encontrado ou código de convite não disponível' });
            }
        }
    });
};

const showEvent = (req, res) => {
    const eventId = req.params.id; // Obtém o ID do evento da URL

    getEventById(eventId, (error, event) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao buscar o evento.' });
        } else if (!event) {
            res.status(404).json({ error: 'Evento não encontrado.' });
        } else {
            res.status(200).json(event);
        }
    });
}

const listById = (req, res) => {
    const userId = req.params.userId; // Assuming you extract the user ID from the URL parameters

    getEventByUserId(userId, (error, events) => {
        if (error) {
            res.status(500).json({ error: 'Erro interno no servidor' });
        } else if (!events || events.length === 0) {
            res.status(404).json({ error: 'Nenhum evento encontrado para o usuário' });
        } else {
            res.status(200).json({ events });
        }
    });
};

const showByCode = (req, res) => {
    const codigo_convite = req.params.codigo_convite; // 

    getEventByInviteCode(codigo_convite, (error, event) => {
        if (error) {
            res.status(500).json({ error: 'Erro interno no servidor' });
        } else if (!event) {
            res.status(404).json({ error: 'Nenhum evento encontrado para o código de convite' });
        } else {
            res.status(200).json({ event });
        }
    });
};

const registerEvent = (req, res) => {
    const event = req.body;

    // função para inserir o evento e obter o código de convite gerado
    insertEvent(event, (error, codigoConvite) => {
        if (error) {
            res.status(500).json({ error: `Erro interno no servidor: ${error}` });
        } else {
            res.status(200).json({ message: 'Evento registrado com sucesso!', codigoConvite });
        }
    });
}

const enterEvent = (req, res) => {
    const inviteCode = req.body.inviteCode;
    const userId = req.body.userId;

    // Verifica se o código de convite é válido
    getEventByInviteCode(inviteCode, (error, event) => {
        if (error) {
            res.status(500).json({ error: `Erro interno no servidor: ${error}` });
        } else if (!event) {
            res.status(404).json({ error: 'Evento não encontrado com o código de convite fornecido.' });
        } else if (event.convidado_id) {
            res.status(403).json({ error: 'Este convite já foi utilizado.' });
        } else {
            // Marca o evento como utilizado pelo usuário atual
            addGuestToEvent(event.id, userId, (updateError) => {
                if (updateError) {
                    res.status(500).json({ error: `Erro ao marcar o convite como utilizado: ${updateError}` });
                } else {
                    // Lógica adicional para processar a entrada no evento (por exemplo, redirecionar para a página do evento)
                    res.status(200).json({ message: 'Entrou no evento com sucesso!', event });
                }
            });
        }
    });
};

const listGuests = (req, res) => {
    const eventId = req.params.id;

    // Obter a lista de usuários convidados para o evento
    getGuestsByEventId(eventId, (error, guests) => {
        if (error) {
            res.status(500).json({ error: `Erro ao obter a lista de convidados: ${error}` });
        } else {
            res.status(200).json({ guests });
        }
    });
};

const removeGuest = (req, res) => {
    const eventId = req.params.id;
    const userId = req.params.userId;

    // Remover o usuário convidado do evento
    removeGuestFromEvent(eventId, userId, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro ao remover o convidado: ${error}` });
        } else {
            // Lógica adicional, se necessário
            res.status(200).json({ message: 'Convidado removido com sucesso!' });
        }
    });
};

const changeEvent = (req, res) => {
    const eventId = req.params.id;
    const eventChanged = req.body;

    updateEvent(eventId, eventChanged, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro interno no servidor: ${error}` });
        } else {
            res.status(200).json({ message: 'Evento alterado com sucesso!' });
        };
    });
};

const removeEvent = (req, res) => {
    const eventId = req.params.id;

    deleteEvent(eventId, (error, deletedEvent) => {
        if (error) {
            res.status(500).json({ error: `Erro ao excluir o evento: ${error}`});
        } else {
            resetAutoIncrement()
            res.status(200).json({ message: `Evento excluído com sucesso!`});
        }
    })
}

module.exports = { 
    listEvents, 
    registerEvent, 
    changeEvent, 
    removeEvent, 
    showEvent, 
    listById, 
    enterEvent, 
    listGuests, 
    removeGuest, 
    showInviteCode,
    showByCode
 };