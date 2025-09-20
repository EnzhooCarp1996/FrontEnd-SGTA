import { useClientes } from "../../hooks/useClientes";
import { Cliente, NewCliente } from "../../types";
import ClientesList from "./ClientesList";
import { useState } from "react";
import ClienteForm from "./ClienteForm";


const ClienteView: React.FC = () => {
    const { clientes, error, agregarCliente, modificarCliente, eliminarCliente } = useClientes();
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editarCliente, setEditarCliente] = useState<Cliente | undefined>();

    const handleAdd = () => { setEditarCliente(undefined); setMostrarForm(true); };
    const handleEdit = (cliente: Cliente) => { setEditarCliente(cliente); setMostrarForm(true); };

    const handleSave = async (cliente: Partial<Cliente>) => {
        try {
            if (editarCliente) {
                const clienteCompleto: Cliente = { ...editarCliente, ...cliente };
                await modificarCliente(clienteCompleto);
            } else {
                await agregarCliente(cliente as NewCliente);
            }
            setMostrarForm(false);
            setEditarCliente(undefined);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => { setEditarCliente(undefined); setMostrarForm(false); };

    return (
        <>
            <ClientesList
                onAddCliente={handleAdd}
                onEditCliente={handleEdit}
                eliminarCliente={eliminarCliente}
                clientes={clientes}
                error={error}
            />
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
