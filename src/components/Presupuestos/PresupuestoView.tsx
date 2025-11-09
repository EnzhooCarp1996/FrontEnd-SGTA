import { PartesVehiculoProvider } from "../../context/Presupuestos/PartesVehiculoProvider";
import { usePresupuestoView } from "../../hooks/Presupuestos/usePresupuestoView";
import { PresupuestosList } from "./PresupuestosList";
import { PresupuestoForm } from "./PresupuestoForm";

export const PresupuestoView: React.FC = () => {
    const {
        vehiculos,
        clientes,
        mostrarForm,
        editarPresupuesto,
        handleAdd,
        handleEdit,
        handleSave,
        handleCancel,
    } = usePresupuestoView();

    return (
        <>
            <PresupuestosList
                onAddPresupuesto={handleAdd}
                onEditPresupuesto={handleEdit}
            />
            {mostrarForm && (
                <PartesVehiculoProvider>
                    <PresupuestoForm
                        presupuesto={editarPresupuesto}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        clientes={clientes}
                        vehiculos={vehiculos}
                    />
                </PartesVehiculoProvider>
            )}
        </>
    );
};

