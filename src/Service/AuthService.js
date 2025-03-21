import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

const AuthService = {
    register: async (userData) => {
        return await axios.post(`${API_URL}/register`, userData);
    },

    login: async (credentials) => {
        return await axios.post(`${API_URL}/login`, credentials);
    },

    isAuthenticated: async () => {
        try {
            const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
            return response.data.authenticated;
        } catch (error) {
            return false;
        }
    }
};

export default AuthService;
