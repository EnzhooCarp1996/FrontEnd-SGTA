import { formatCurrency } from "../../helpers/utilsPresupuestos";
import { formatDate } from "../../helpers/utilsVehiculos";
import { Calendar, FileText, User } from "lucide-react";
import { TarjetaSpan } from "../Clientes/ClientesListComponents/TarjetaSpan";
import { CardSection } from "../Shared/CardSection";
import { CardHeader } from "../Shared/CardHeader";
import { PresupuestoData } from "../../types";
import { CardItem } from "../Shared/CardItem";
import { Card } from "../Shared/Card";


interface PresupuestoCardProps {
    presupuesto: PresupuestoData;
    onEdit: (presupuesto: PresupuestoData) => void;
    onDelete: (id: string) => void;
}

export const PresupuestoCard: React.FC<PresupuestoCardProps> = ({
    presupuesto,
    onEdit,
    onDelete,
}) => {
    const total =
        presupuesto.manoDeObraChapa +
        presupuesto.manoDeObraPintura +
        presupuesto.totalRepuestos;

    return (
        <Card>
            <CardHeader
                icon={FileText}
                title={presupuesto._id.slice(-8)}
                buttons={{
                    onEdit: () => onEdit(presupuesto),
                    onDelete: () => onDelete(presupuesto._id)
                }}
            />

            {/* Detalles */}
            <CardSection className="space-y-2">
                <CardItem className="text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Fecha: {formatDate(presupuesto.fecha)}</span>
                </CardItem>

                <TarjetaSpan>
                    <span className="font-medium">Mano de obra Pintura: </span>
                    <span>{formatCurrency(presupuesto.manoDeObraPintura)}</span>
                </TarjetaSpan>

                <TarjetaSpan>
                    <span className="font-medium">Mano de obra Chapa: </span>
                    <span>{formatCurrency(presupuesto.manoDeObraChapa)}</span>
                </TarjetaSpan>

                <TarjetaSpan>
                    <span className="font-medium">Total Repuestos: </span>
                    <span>{formatCurrency(presupuesto.totalRepuestos)}</span>
                </TarjetaSpan>

                <TarjetaSpan>
                    <span className="font-medium">Total: </span>
                    <span>{formatCurrency(total)}</span>
                </TarjetaSpan>
            </CardSection>


            {/* Cliente */}
            <CardItem className="text-gray-500">
                <User className="w-4 h-4" />
                <span>Cliente: {presupuesto.cliente}</span>
            </CardItem>
        </Card>
    );
};
