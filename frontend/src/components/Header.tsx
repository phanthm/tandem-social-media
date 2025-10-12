import React from "react";
import { useAuth } from "../context/AuthContext";
import "../stylesheets/Header.css";

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">Tandem</h1>
          <div className="user-section">
            <span className="loading-text">Loading...</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Tandem</h1>
        {user ? (
          <div className="user-section">
            <div className="user-info">
              {user.photo && (
                <img
                  src={user.photo}
                  alt={user.displayName || "User avatar"}
                  className="user-avatar"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              )}
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="Sign out"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="user-section">
            <span className="guest-text">Not signed in</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
