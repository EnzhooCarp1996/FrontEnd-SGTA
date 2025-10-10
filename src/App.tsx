import { AppContent } from "./components/Layout/AppContent";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/Login/LoginForm";
import { useAuth } from "./hooks/useAuth";

function AppContentWrapper() {
  const { token } = useAuth();

  if (!token) return <LoginForm />;

  return <AppContent />;
}

export const App = () => {
  return (
    <AuthProvider>
      <AppContentWrapper />
    </AuthProvider>
  );
}
