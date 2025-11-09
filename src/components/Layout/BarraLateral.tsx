import { LogoDelSistema } from './BarraLateralComponents/LogoDelSistema';
import { Footer } from "./BarraLateralComponents/Footer";
import { Nav } from "./BarraLateralComponents/Nav";

interface BarraLateralProps {
  role: string;
  isOpen: boolean;
  onAlternar: () => void;
}

export const BarraLateral: React.FC<BarraLateralProps> = ({ role, isOpen, onAlternar }) => {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onAlternar}
        />
      )}
      <div
        className={`
          fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-green-800 to-green-900 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
          flex flex-col
        `}
      >
        <LogoDelSistema />
        <Nav role={role} onAlternar={onAlternar} />;
        <Footer />
      </div>
    </>
  );
};

