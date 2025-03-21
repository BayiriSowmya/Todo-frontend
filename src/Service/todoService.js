import axios from "axios";

const BASE_URL = "http://localhost:8081/api/Todo";

const TodoService = {
    addTask: async (task) => {
        try {
            return await axios.post(`${BASE_URL}/add`, task);
        } catch (error) {
            console.error("❌ Error adding task:", error);
            throw error;
        }
    },

    getAllTasks: async () => {
        try {
            return await axios.get(`${BASE_URL}/getAll`);
        } catch (error) {
            console.error("❌ Error fetching tasks:", error);
            throw error;
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            console.log(`🔄 Updating task ${id} with data:`, updatedTask);

            const response = await axios.put(`${BASE_URL}/${id}`, updatedTask, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Task updated:", response.data);
            return response;
        } catch (error) {
            console.error(`❌ Error updating task ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    deleteTask: async (id) => {
        try {
            return await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error("❌ Error deleting task:", error);
            throw error;
        }
    },
};

export default TodoService;
