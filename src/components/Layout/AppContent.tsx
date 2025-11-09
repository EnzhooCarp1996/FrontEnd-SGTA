import { useAppContent } from "../../hooks/useAppContent";
import { BrowserRouter } from "react-router-dom";
import { BarraLateral } from "./BarraLateral";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Main } from "./Main";

export const AppContent: React.FC = () => {
  const { role, abrirBarraLateral, alternarBarraLateral } = useAppContent();

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Toaster position="top-right" />

        {/* Barra lateral */}
        <BarraLateral role={role} isOpen={abrirBarraLateral} onAlternar={alternarBarraLateral}/>
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header onAlternarMenu={alternarBarraLateral} vistaActual="" />
          <Main role={role} />
        </div>

      </div>
    </BrowserRouter>
  );
};

