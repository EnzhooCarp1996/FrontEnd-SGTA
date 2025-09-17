import { useEffect, useState } from "react";
import LoginForm from "./components/Login/LoginForm";
import AppContent from "./components/Layout/AppContent";

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLoginSuccess = (token: string) => {
    setToken(token);
    window.history.pushState({}, "", "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) return <LoginForm onLoginSuccess={handleLoginSuccess} />;

  return <AppContent token={token} onLogout={handleLogout} />;
}

export default App;
