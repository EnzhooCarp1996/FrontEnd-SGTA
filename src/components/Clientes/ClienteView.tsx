import React, { useState } from "react";
import ClientesList from "./ClientesList";
import ClienteForm from "./ClienteForm";
import { Cliente } from "../../types";
//import { useAuth } from "../../hooks/useAuth";


const ClienteView: React.FC = () => {
//    const { token } = useAuth(); // 🔹 obtenemos el token del contexto
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editarCliente, setEditarCliente] = useState<Cliente | undefined>();

    const handleAdd = () => { setEditarCliente(undefined); setMostrarForm(true); };
    const handleEdit = (cliente: Cliente) => { setEditarCliente(cliente); setMostrarForm(true); };
    const handleSave = (cliente: Partial<Cliente>) => { console.log(cliente); setMostrarForm(false); setEditarCliente(undefined); };
    const handleCancel = () => { setMostrarForm(false); setEditarCliente(undefined); };

    return (
        <>
            <ClientesList onAddCliente={handleAdd} onEditCliente={handleEdit} />
            {mostrarForm && (
                <ClienteForm
                    cliente={editarCliente}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default ClienteView;
