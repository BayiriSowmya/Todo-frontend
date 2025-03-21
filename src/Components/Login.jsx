import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import { Form, Button, Alert } from "react-bootstrap";

const Login = () => {
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await AuthService.login(formData);
            setMessage("Login successful! Redirecting...");
            setTimeout(() => navigate("/todos"), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleSubmit} className="w-50 mx-auto p-4 border rounded shadow">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Login</Button>

                {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <div className="mt-3 text-center">
                    Don't have an account? <a href="/register">Register here</a>
                </div>
            </Form>
        </div>
    );
};

export default Login;
