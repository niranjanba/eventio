import React from "react";
import { useGlobalContext } from "./context/context";
import { Navigate } from "react-router-dom";
import Loading from "./components/Loading";

function ProtectedRoute({ children }) {
    const { user, loading } = useGlobalContext();
    if (loading) {
        return <Loading />;
    }
    if (!user) {
        return <Navigate to={"/login"} />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;
