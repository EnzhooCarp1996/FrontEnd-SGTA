import { formatDate, getStatusColor } from "../../helpers/utilsVehiculos";
import { useVehiculoCard } from "../../hooks/Vehiculos/useVehiculoCard";
import { CardSection } from "../Shared/CardSection";
import { Calendar, Car, User } from "lucide-react";
import { CardHeader } from "../Shared/CardHeader";
import { Vehiculo, Cliente } from "../../types";
import { CardItem } from "../Shared/CardItem";
import { Card } from "../Shared/Card";

interface VehiculoCardProps {
    vehiculo: Vehiculo;
    clientes: Cliente[];
    onEdit: (vehiculo: Vehiculo) => void;
    onDelete: (id: number) => void;
}

export const VehiculoCard: React.FC<VehiculoCardProps> = ({ vehiculo, clientes, onEdit, onDelete }) => {
    const { isOverdue, getClienteNombre } = useVehiculoCard(vehiculo, clientes);

    return (
        <Card>
            <CardHeader
                icon={Car}
                title={vehiculo.patente}
                subtitle={`${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.anio})`}
                buttons={{
                    onEdit: () => onEdit(vehiculo),
                    onDelete: () => onDelete(vehiculo.idVehiculo)
                }}
            />

            <CardSection>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehiculo.estado)}`}>
                    {vehiculo.estado}
                </span>
                {isOverdue && (
                    <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        Vencido
                    </span>
                )}
            </CardSection>
            <CardSection className="space-y-2">
                <CardItem className="text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Recepción: {formatDate(vehiculo.fechaRecibido)}</span>
                </CardItem>
                <CardItem className="text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Esperada: {formatDate(vehiculo.fechaEsperada)}</span>
                </CardItem>
                {vehiculo.fechaEntrega && (
                    <CardItem className="text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Entregado: {formatDate(vehiculo.fechaEntrega)}</span>
                    </CardItem>
                )}
            </CardSection>

            <CardSection>
                <p className="text-sm text-gray-700 font-medium mb-1">Trabajos:</p>
                <p className="text-sm text-gray-600 line-clamp-2">{vehiculo.descripcionTrabajos}</p>
            </CardSection>

            <CardItem className="text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {getClienteNombre(vehiculo.idCliente)}</span>
            </CardItem>
        </Card>
    );
};
