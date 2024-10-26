// LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "../utility/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // To handle login errors
    const { login } = useAuth();
    const navigate = useNavigate();  // React Router v6 hook for navigation

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                login({
                    username: userData.username,
                    email: userData.email,
                    role: userData.is_superuser ? "admin" : "user",
                    is_superuser: userData.is_superuser,
                });

                // After successful login, redirect to the home page (or another protected route)
                navigate("/administrador", { replace: true });
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed", error);
            setError("An error occurred while logging in. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
