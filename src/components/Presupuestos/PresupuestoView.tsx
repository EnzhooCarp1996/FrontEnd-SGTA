import { usePresupuestoView } from "../../hooks/Presupuestos/usePresupuestoView";
import PresupuestosList from "./PresupuestosList";
import PresupuestoForm from "./PresupuestoForm";

const PresupuestoView: React.FC = () => {
    const {
        presupuestos,
        vehiculos,
        clientes,
        error,
        mostrarForm,
        editarPresupuesto,
        handleAdd,
        handleEdit,
        handleSave,
        handleCancel,
        eliminarPresupuesto
    } = usePresupuestoView();

    return (
        <>
            <PresupuestosList
                onAddPresupuesto={handleAdd}
                onEditPresupuesto={handleEdit}
                eliminarPresupuesto={eliminarPresupuesto}
                presupuestos={presupuestos}
                clientes={clientes}
                error={error}
            />
            {mostrarForm && (
                <PresupuestoForm
                    presupuestos={editarPresupuesto}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    clientes={clientes}
                    vehiculos={vehiculos}
                />
            )}
        </>
    );
};

export default PresupuestoView;
