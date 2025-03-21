import { useState } from "react";
import { useNavigate } from "react-router-dom";
import todoService from "../Service/todoService";
import { Form, Button, Alert, Spinner, Container } from "react-bootstrap";

const TodoAdd = () => {
    const [task, setTask] = useState({ title: "", description: "", completed: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await todoService.addTask(task); // API Call
            navigate("/todos"); // ✅ Redirect to todo list after adding task
        } catch (err) {
            setError("❌ Failed to add task. Please try again.");
            console.error("Error adding task:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add Todo</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Add Task"}
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate("/todos")}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default TodoAdd;
