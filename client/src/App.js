import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddEvent from "./Pages/AddEvent";
import SingleEvent from "./Pages/SingleEvent";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";

import "./axios/globals";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/add-event"
                    element={
                        <ProtectedRoute>
                            <AddEvent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/event/:eventId" element={<SingleEvent />} />
            </Routes>
        </Router>
    );
}

export default App;
