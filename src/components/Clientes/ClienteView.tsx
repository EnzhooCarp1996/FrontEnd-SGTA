import { useClienteView } from "../../hooks/Clientes/useClienteView";
import ClientesList from "./ClientesList";
import ClienteForm from "./ClienteForm";

const ClienteView: React.FC = () => {
  const {
    clientes,
    errorCliente,
    mostrarForm,
    editarCliente,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    eliminarCliente,
  } = useClienteView();

    return (
        <>
            <ClientesList
                onAddCliente={handleAdd}
                onEditCliente={handleEdit}
                eliminarCliente={eliminarCliente}
                clientes={clientes}
                error={errorCliente}
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
