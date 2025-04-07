import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TaskPage from "../../pages/TaskPage";
import TaskDetailsPage from "../../pages/TaskDetailsPage";

const RoutesComponent: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/tasks" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <TaskDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
