// ProtectedRoute.tsx (for React Router v6)
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    requiredRole: "admin" | "user";
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user } = useAuth();

    if (!user || user.role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
