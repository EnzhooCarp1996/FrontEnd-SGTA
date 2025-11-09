import { getResponsabilidadColor } from "../../../helpers/utilsClientes";
import { CardSection } from "../../Shared/CardSection";
import { CardHeader } from "../../Shared/CardHeader";
import { Building, User } from "lucide-react";
import { TarjetaSpan } from "./TarjetaSpan";
import { Cliente } from "../../../types";
import { Card } from "../../Shared/Card";
import { Contacto } from "./Contacto";

interface ClienteCardProps {
    cliente: Cliente;
    onEdit: (cliente: Cliente) => void;
    onDelete: (id: number) => void;
}

export const ClienteCard: React.FC<ClienteCardProps> = ({ cliente, onEdit, onDelete }) => {
    const isEmpresa = cliente.tipoCliente === "Empresa";

    return (
        <Card>
            <CardHeader
                icon={isEmpresa ? Building : User}
                iconBgClass={isEmpresa ? "bg-purple-100" : "bg-green-100"}
                iconColorClass={isEmpresa ? "text-purple-600" : "text-green-600"}
                title={isEmpresa ? cliente.nombreDeFantasia : `${cliente.nombre} ${cliente.apellido}`}
                subtitle={isEmpresa ? cliente.razonSocial : undefined}
                buttons={{
                    onEdit: () => onEdit(cliente),
                    onDelete: () => onDelete(cliente.idCliente)
                }}
            />

            {/* Datos de contacto */}
            <CardSection className="space-y-2">
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
            </CardSection>

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
        </Card>
    );
};
