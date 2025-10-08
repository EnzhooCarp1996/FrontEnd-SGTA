interface SeccionHeaderProps {
  titulo: string;
  onAgregar: () => void;
  colorBoton?: string;
  textoBoton?: string;
}

export const SeccionHeader: React.FC<SeccionHeaderProps> = ({
  titulo,
  onAgregar,
  colorBoton = "green",
  textoBoton = "Agregar Parte",
}) => (
  <div className="flex justify-between items-center mb-1">
    <h2 className="text-lg font-medium">{titulo}</h2>
    <button
      type="button"
      onClick={onAgregar}
      className={`bg-${colorBoton}-600 hover:bg-${colorBoton}-800 text-white px-3 py-1 rounded`}
    >
      {textoBoton}
    </button>
  </div>
);
