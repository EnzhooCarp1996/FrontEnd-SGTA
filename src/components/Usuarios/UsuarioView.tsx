import { useUsuarioView } from "../../hooks/Usuarios/useUsuariosView";
import Usuarios from "./UsuariosList";

const UsuarioView: React.FC = () => {
    const {
        usuarios,
        errorUsuario,
        mostrarForm,
        editarUsuario,
        handleAdd,
        handleEdit,
        handleSave,
        handleCancel,
        eliminarUsuario,
    } = useUsuarioView();

    return (
        <>
            <Usuarios
                onAddUsuario={handleAdd}
                onEditUsuario={handleEdit}
                eliminarUsuario={eliminarUsuario}
                usuarios={usuarios}
                error={errorUsuario}
            />
            {/* {mostrarForm && (
                <ClienteForm
                    cliente={editarCliente}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )} */}
        </>
    );
};

export default UsuarioView;
