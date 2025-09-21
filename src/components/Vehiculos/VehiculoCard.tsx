import { formatDate, getDaysFromNow, getStatusColor } from "../../helpers/utilsVehiculos";
import { BotonesTarjeta } from "../Shared/BotonesTarjeta";
import { Calendar, Car, User } from "lucide-react";
import { Vehiculo, Cliente } from "../../types";

interface VehiculoCardProps {
    vehiculo: Vehiculo;
    clientes: Cliente[];
    onEdit: (vehiculo: Vehiculo) => void;
    onDelete: (id: number) => void;
}

export const VehiculoCard: React.FC<VehiculoCardProps> = ({ vehiculo, clientes, onEdit, onDelete }) => {
    const daysToExpected = getDaysFromNow(vehiculo.fechaEsperada);
    const isOverdue = daysToExpected !== null && daysToExpected < 0 && vehiculo.estado !== "Entregado";

    const getClienteNombre = (idCliente?: number | null) => {
        if (!idCliente) return "Sin Cliente";
        const cliente = clientes.find(c => c.idCliente === idCliente);
        if (!cliente) return "Sin Cliente";
        return cliente.tipoCliente === "Empresa"
            ? cliente.nombreDeFantasia
            : `${cliente.nombre} ${cliente.apellido}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md hover:border-green-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{vehiculo.patente}</h3>
                        <p className="text-gray-600">{vehiculo.marca} {vehiculo.modelo} ({vehiculo.anio})</p>
                    </div>
                </div>
                <BotonesTarjeta
                    onEdit={() => onEdit(vehiculo)}
                    onDelete={() => onDelete(vehiculo.idVehiculo)}
                />
            </div>

            <div className="mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehiculo.estado)}`}>
                    {vehiculo.estado}
                </span>
                {isOverdue && (
                    <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        Vencido
                    </span>
                )}
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Recepción: {formatDate(vehiculo.fechaRecibido)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Esperada: {formatDate(vehiculo.fechaEsperada)}</span>
                </div>
                {vehiculo.fechaEntrega && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Entregado: {formatDate(vehiculo.fechaEntrega)}</span>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-700 font-medium mb-1">Trabajos:</p>
                <p className="text-sm text-gray-600 line-clamp-2">{vehiculo.descripcionTrabajos}</p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {getClienteNombre(vehiculo.idCliente)}</span>
            </div>
        </div>
    );
};
