import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../../styles/Header.scss";
import { AuthContext } from "../../features/auth/model/authContext";

const Header: React.FC = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // if logout is async
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>MyApp</h1>
        </Link>
        <div className="user-actions">
          {user && (
            <button className="btn logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
