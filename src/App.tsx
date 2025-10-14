import { AppContent } from "./components/Layout/AppContent";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { LoginForm } from "./components/Login/LoginForm";
import { useAuth } from "./context/Auth/useAuth";

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
