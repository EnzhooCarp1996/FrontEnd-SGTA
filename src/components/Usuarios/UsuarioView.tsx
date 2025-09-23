import { useUsuarioView } from "../../hooks/Usuarios/useUsuariosView";
import Usuarios from "./UsuariosList";

const UsuarioView: React.FC = () => {
    const {
        usuarios,
        errorUsuario,
        editarUsuario,
        handleAdd,
        handleEdit,
        handleSave,
        eliminarUsuario,
    } = useUsuarioView();

    return (
        <>
            <Usuarios
                onAddUsuario={handleAdd}
                onEditUsuario={handleEdit}
                eliminarUsuario={eliminarUsuario}
                usuarios={usuarios}
                usuario={editarUsuario}
                onSave={handleSave}
                error={errorUsuario}
            />
        </>
    );
};

export default UsuarioView;
