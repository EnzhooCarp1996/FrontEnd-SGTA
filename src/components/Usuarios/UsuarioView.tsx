import { useUsuarioView } from "../../hooks/Usuarios/useUsuariosView";
import { UsuariosList } from "./UsuariosList";

export const UsuarioView: React.FC = () => {
    const { usuarios, errorUsuario, editarUsuario, handleAdd, handleEdit, handleSave, eliminarUsuario } = useUsuarioView();

    return (
        <>
            <UsuariosList
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


