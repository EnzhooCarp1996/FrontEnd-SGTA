import { getResponsabilidadColor } from "../../helpers/utilsClientes";
import { BotonesTarjeta } from "../Shared/BotonesTarjeta";
import { Building, User } from "lucide-react";
import { TarjetaSpan } from "./TarjetaSpan";
import { Contacto } from "./Contacto";
import { Cliente } from "../../types";

interface ClienteCardProps {
    cliente: Cliente;
    onEdit?: (cliente: Cliente) => void;
    onDelete?: (id: number) => void;
}

export const ClienteCard: React.FC<ClienteCardProps> = ({ cliente, onEdit, onDelete }) => {
    const isEmpresa = cliente.tipoCliente === "Empresa";

    return (
        <div
            key={cliente.idCliente}
            className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md
                 hover:border-green-500 transform hover:-translate-y-1 transition-all"
        >
            {/* Header con icono y botones */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isEmpresa ? "bg-purple-100" : "bg-green-100"}`}>
                        {isEmpresa ? (
                            <Building className={`w-5 h-5 ${isEmpresa && "text-purple-600"}`} />
                        ) : (
                            <User className="w-5 h-5 text-green-600" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {isEmpresa
                                ? cliente.nombreDeFantasia
                                : `${cliente.nombre} ${cliente.apellido}`}
                        </h3>
                        {isEmpresa && <p className="text-sm text-gray-500">{cliente.razonSocial}</p>}
                    </div>
                </div>
                {(onEdit || onDelete) && (
                    <BotonesTarjeta
                        onEdit={onEdit ? () => onEdit(cliente) : undefined}
                        onDelete={onDelete ? () => onDelete(cliente.idCliente) : undefined}
                    />
                )}
            </div>

            {/* Datos de contacto */}
            <div className="space-y-2 mb-4">
                <TarjetaSpan>
                    <Contacto contacto={cliente.telefono} />
                </TarjetaSpan>
                <TarjetaSpan>
                    <Contacto contacto={cliente.celular} />
                </TarjetaSpan>
                <TarjetaSpan>
                    <span className="font-medium">{cliente.tipoDocumento}:</span>
                    <span>{cliente.documento}</span>
                </TarjetaSpan>
            </div>

            {/* Responsabilidad fiscal */}
            <div className="flex justify-between items-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getResponsabilidadColor(
                        cliente.responsabilidad
                    )}`}
                >
                    {cliente.responsabilidad}
                </span>
            </div>
        </div>
    );
};
