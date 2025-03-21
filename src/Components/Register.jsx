import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../Service/AuthService";
import { Form, Button, Alert } from "react-bootstrap";

const Register = () => {
    const [formData, setFormData] = useState({ fullName: "", userName: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
    };

    // Validate Form Fields
    const validate = () => {
        let validationErrors = {};
        if (!formData.fullName.trim()) validationErrors.fullName = "Full Name is required!";
        if (!formData.userName.trim()) validationErrors.userName = "Username is required!";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            validationErrors.email = "Email is required!";
        } else if (!emailPattern.test(formData.email)) {
            validationErrors.email = "Invalid email format!";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required!";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters!";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!validate()) {
            return; // Stop submission if validation fails
        }

        try {
            await AuthService.register(formData);
            setMessage("Registration successful! Redirecting...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.message || "Registration failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Register</h1>
            <Form onSubmit={handleSubmit} className="w-50 mx-auto p-4 border rounded shadow">
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        isInvalid={!!errors.fullName} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="userName" 
                        value={formData.userName} 
                        onChange={handleChange} 
                        isInvalid={!!errors.userName} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        isInvalid={!!errors.email} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        isInvalid={!!errors.password} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Register</Button>

                {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                {/* Login Link */}
                <div className="text-center mt-3">
                    <p>Already registered? <Link to="/login">Login here</Link></p>
                </div>
            </Form>
        </div>
    );
};

export default Register;
