import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/Login/LoginForm";
import AppContent from "./components/Layout/AppContent";

function AppContentWrapper() {
  const { token } = useAuth();

  if (!token) return <LoginForm />;

  return <AppContent />;
}

function App() {
  return (
    <AuthProvider>
      <AppContentWrapper />
    </AuthProvider>
  );
}

export default App;
