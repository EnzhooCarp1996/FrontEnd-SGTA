import { Usuario } from "../../types";
import { BotonesTarjeta } from "../Shared/BotonesTarjeta";
import { InputForm } from "../Shared/InputForm";
import { useUsuariosList } from "../../hooks/Usuarios/useUsuariosList";
import { Save } from "lucide-react";



interface UsuarioProps {
  onAddUsuario: () => void;
  onEditUsuario: (usuario: Usuario) => void;
  onSave: (usuario: Partial<Usuario>) => void;
  eliminarUsuario: (id: number, nombre: string) => void;
  usuarios: Usuario[];
  usuario?: Usuario;
  error: string | null;
}

const UsuariosList: React.FC<UsuarioProps> = ({ usuario, usuarios, onSave, /*onAddUsuario,*/ onEditUsuario, eliminarUsuario }) => {
  const {
    formData,
    handleSubmit,
    handleChange,
    resetForm,
  } = useUsuariosList(usuario, usuarios, onSave);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Formulario */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 w-full">
            <div className="flex-1">
              <InputForm label="Nombre de Usuario" name="nombreUsuario" value={formData.nombreUsuario ?? ""} onChange={handleChange} placeholder="Cesar" required />
            </div>
            <div className="flex-1">
              <InputForm label="Correo" type="email" name="correo" value={formData.correo ?? ""} onChange={handleChange} placeholder="example@gmail.com" required />
            </div>
            <div className="flex-1">
              <InputForm label="Contraseña" name="contrasenia" value={formData.contrasenia ?? ""} onChange={handleChange} placeholder="*********" required />
            </div>
            <div className="flex-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuario<span className="text-red-500">*</span></label>

              <select id="role" name="role" value={formData.role} onChange={handleChange} className="border px-3 py-2 rounded-md w-full" required >
                <option value="">Seleccionar rol</option>
                <option value="Encargado">Encargado</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Guardar</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
        {/* Tabla */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-600 px-2 py-1">ID</th>
                <th className="border border-gray-600 px-2 py-1">Usuario</th>
                <th className="border border-gray-600 px-2 py-1">Correo</th>
                <th className="border border-gray-600 px-2 py-1">Rol</th>
                <th className="border border-gray-600 px-1 py-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.idUsuario} className="hover:bg-gray-50">
                  <td className="border border-gray-600 px-2 py-1 break-words text-center">{u.idUsuario}</td>
                  <td className="border border-gray-600 px-2 py-1  wbreak-words">{u.nombreUsuario}</td>
                  <td className="border border-gray-600 px-2 py-1  wbreak-words">{u.correo}</td>
                  <td className="border border-gray-600 px-2 py-1  wbreak-words">{u.role}</td>
                  <td className="border border-gray-600 px-2 py-1  break-words ">
                    <BotonesTarjeta
                      onEdit={() => onEditUsuario(u)}
                      onDelete={() => eliminarUsuario(u.idUsuario, u.nombreUsuario)}
                    />

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsuariosList;
