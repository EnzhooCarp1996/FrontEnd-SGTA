import { useEffect, useState } from "react";
import { Usuario } from "../../types";
import { useUsuariosList } from "../../hooks/Usuarios/useUsuariosList";


interface UsuarioProps {
  onAddUsuario: () => void;
  onEditUsuario: (usuario: Usuario) => void;
  eliminarUsuario: (id: number) => void;
  usuarios: Usuario[];
  error: string | null;
}

const UsuariosList: React.FC<UsuarioProps> = ({ }) => {
  const {
      usuarios,
      errorUsuario,
      eliminarUsuario,
      searchTerm,
      setSearchTerm,
    } = useUsuariosList();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{nombreUsuario: string; rol: string}>({ nombreUsuario: "", rol: "" });
  const [editingId, setEditingId] = useState<number | null>(null);




  // 🔹 Manejo de formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setForm({ nombreUsuario: "", rol: "" });
      setEditingId(null);
    } catch (err: any) {
      setError(err.message || "Error guardando usuario");
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setForm({ nombreUsuario: usuario.nombreUsuario, rol: usuario.role });
    setEditingId(usuario.idUsuario);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      
  
    } catch (err: any) {
      setError(err.message || "Error eliminando usuario");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="nombreUsuario"
          value={form.nombreUsuario}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="border px-3 py-2 rounded-md flex-1"
          required
        />
        <select name="rol" value={form.rol} onChange={handleChange} className="border px-3 py-2 rounded-md" required>
          <option value="">Seleccionar rol</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Usuario</th>
            <th className="border px-4 py-2">Rol</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.idUsuario} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{u.idUsuario}</td>
              <td className="border px-4 py-2">{u.nombreUsuario}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.idUsuario)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && !loading && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No hay usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosList;
