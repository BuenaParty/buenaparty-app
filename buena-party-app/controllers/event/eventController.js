const { getEvents, insertEvent, updateEvent, deleteEvent, resetAutoIncrement, getEventById } = require('../../models/eventModel');

const listEvents = (req, res) => {
    getEvents((error, result) => {
        if (error) {
            res.status(500).json({ error: `Erro no servidor: ${error}` });
        } else {
            res.status(200).json({ result });
        }
    });
}

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

const registerEvent = (req, res) => {
    const event = req.body;

    insertEvent(event, (error) => {
        if (error) {
            res.status(500).json({ error: `Erro interno no servidor: ${error}` });
        } else {
            res.status(200).json({ message: 'Evento registrado com sucesso!' });
        }
    });
}

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

module.exports = { listEvents, registerEvent, changeEvent, removeEvent, showEvent };