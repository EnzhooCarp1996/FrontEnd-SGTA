import { formatearImporte } from "../../../helpers/utilsPresupuestos";
import { NewPresupuesto } from "../../../types";

interface ResumenVistaPreviaProps {
    presupuesto: NewPresupuesto;
    totalCalculado: number;
}

export const ResumenVistaPrevia: React.FC<ResumenVistaPreviaProps> = ({
    presupuesto,
    totalCalculado,
}) => {
    return (
        <div className="border-t bg-white p-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2 sm:gap-0">
                {/* Datos principales */}
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <span>
                        <strong>Cliente:</strong> {presupuesto.cliente || "—"}
                    </span>
                    <span>
                        <strong>Vehículo:</strong> {presupuesto.vehiculo || "—"}
                    </span>
                    <span>
                        <strong>Patente:</strong> {presupuesto.patente || "—"}
                    </span>
                    <span>
                        <strong>Total:</strong> $ {formatearImporte(totalCalculado)}
                    </span>
                </div>

                {/* Cantidad de ítems */}
                <div className="text-xs text-gray-500 whitespace-nowrap">
                    {presupuesto.items.length} ítems presupuestados
                </div>
            </div>
        </div>
    );
};

