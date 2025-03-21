import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

function App() {
    return (
        <Router>
            <div className="container mt-5">
                <h1 className="text-center">Todo Application</h1>
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/todos" element={<TodoList />} />
                    <Route path="/todoadd" element={<TodoForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
