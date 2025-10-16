import { Route, Routes, useLocation } from "react-router-dom";
import "./stylesheets/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { LocationProvider } from "./context/LocationContext";

function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/login";
  return (
    <AuthProvider>
      <LocationProvider>
        <div className="app-container">
          {showHeader && <Header />}
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
