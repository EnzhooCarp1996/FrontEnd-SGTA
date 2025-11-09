import { Plus } from "lucide-react";

interface SeccionHeaderProps {
  titulo: string;
  onAgregarParte: () => void;
  ubicacion: string;
}

export const SeccionHeader: React.FC<SeccionHeaderProps> = ({
  titulo,
  onAgregarParte,
}) => {

  return (
    <div className="flex justify-between items-center mb-1">
      <h2 className="text-lg font-medium">{titulo}</h2>
      <div className="flex justify-between items-center mb-1">
        <button
          type="button"
          onClick={() => onAgregarParte()}
          className={"bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded"}
        >
          <Plus/>
        </button>
      </div>
    </div>
  )
};
