import React, { useState } from "react";
import PresupuestosList from "./PresupuestosList";
import PresupuestoForm from "./PresupuestoForm";
import { Presupuesto } from "../../types";

const PresupuestoView: React.FC = () => {
    const [mostrarForm, setMostrarForm] = useState(false);

    const handleAdd = () => setMostrarForm(true);
    const handleSave = (presupuesto: Partial<Presupuesto>) => { console.log(presupuesto); setMostrarForm(false); };
    const handleCancel = () => setMostrarForm(false);

    return (
        <>
            <PresupuestosList onAddPresupuesto={handleAdd} onEditPresupuesto={handleAdd} />
            {mostrarForm && (
                <PresupuestoForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default PresupuestoView;
