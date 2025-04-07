import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../features/auth/model/authContext";
import RoutesComponent from "./router/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <RoutesComponent />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
