import { useClienteView } from "../../hooks/Clientes/useClienteView";
import { ClientesList } from "./ClientesList";
import { ClienteForm } from "./ClienteForm";

export const ClienteView: React.FC = () => {
  const {
    mostrarForm,
    editarCliente,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
  } = useClienteView();

    return (
        <>
            <ClientesList
                onAddCliente={handleAdd}
                onEditCliente={handleEdit}
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

