import axios from 'axios';

const API_URL = 'http://localhost:3000';

const authUser = async (e_mail, senha) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { e_mail, senha });

        if (response.data) {
            return response.data;
        } else {
            return null;
        };
    } catch (error) {
        throw error;
    }
};

export { authUser };