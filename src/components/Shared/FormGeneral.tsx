import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { HeaderForm } from "./HeaderForm";

interface FormGeneralProps {
  icon: LucideIcon;
  titulo: string;
  condicion: boolean;
  onCancel: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: ReactNode;
  maxWidth?: string;
}

export const FormGeneral: React.FC<FormGeneralProps> = ({
  icon,
  titulo,
  condicion = false,
  onCancel,
  onSubmit,
  children,
  maxWidth = "max-w-4xl",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg border-2 border-black shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
      >
        <HeaderForm
          icon={icon}
          titulo={titulo}
          condicion={!!condicion}
          onCancel={onCancel}
        />

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {children}
        </form>
        
      </div>
    </div>
  );
};
