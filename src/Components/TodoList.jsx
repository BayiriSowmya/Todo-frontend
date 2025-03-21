import { useEffect, useState } from "react";
import todoService from "../Service/todoService";
import { Button, Table, Form, FormControl, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValues, setEditValues] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await todoService.getAllTasks();
            console.log("📋 Fetched tasks:", response.data);
            setTasks(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error fetching tasks.");
            console.error("❌ Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log("🗑️ Attempting to delete task with ID:", id);

        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await todoService.deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id)); // Remove deleted task from UI
            console.log("✅ Successfully deleted task:", id);
        } catch (err) {
            setError("Failed to delete task.");
            console.error("❌ Error deleting task:", err.response?.data || err.message);
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditValues({ title: task.title, description: task.description });
    };

    const handleEditChange = (e) => {
        setEditValues({ ...editValues, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async (taskId) => {
        console.log("✏️ Updating task:", taskId, editValues);

        try {
            const updatedTask = { ...tasks.find((t) => t.id === taskId), ...editValues };
            await todoService.updateTask(taskId, updatedTask);
            setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
            setEditingTaskId(null);
            console.log("✅ Successfully updated task:", taskId);
        } catch (err) {
            setError("Failed to update task.");
            console.error("❌ Error updating task:", err.response?.data || err.message);
        }
    };

    const handleCompletionToggle = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        try {
            await todoService.updateTask(task.id, updatedTask);
            setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t))); // Optimistic UI update
        } catch (err) {
            setError("Error updating task status.");
            console.error("❌ Error updating task status:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Todo List</h2>
            <Button variant="primary" onClick={() => navigate("/todoadd")}>Add Todo</Button>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {loading ? (
                <div className="text-center mt-4">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>
                                        {editingTaskId === task.id ? (
                                            <FormControl
                                                type="text"
                                                name="title"
                                                value={editValues.title}
                                                onChange={handleEditChange}
                                            />
                                        ) : (
                                            <span className={task.completed ? "text-decoration-line-through" : ""}>
                                                {task.title}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {editingTaskId === task.id ? (
                                            <FormControl
                                                type="text"
                                                name="description"
                                                value={editValues.description}
                                                onChange={handleEditChange}
                                            />
                                        ) : (
                                            <span className={task.completed ? "text-decoration-line-through" : ""}>
                                                {task.description}
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleCompletionToggle(task)}
                                        />
                                    </td>
                                    <td>
                                        {editingTaskId === task.id ? (
                                            <Button variant="success" className="me-2" onClick={() => handleSaveEdit(task.id)}>
                                                Save
                                            </Button>
                                        ) : (
                                            <Button variant="info" className="me-2" onClick={() => handleEditClick(task)}>
                                                Edit
                                            </Button>
                                        )}
                                        <Button variant="danger" onClick={() => handleDelete(task.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default TodoList;
