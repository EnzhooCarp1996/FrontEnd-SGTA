import { useState } from "react";
import { Eye, EyeOff, PaintBucket } from "lucide-react";
import { login as loginService } from "../../Services/AuthService";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();

  const [showContrasenia, setShowContrasenia] = useState(false);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contrasenia: "",
    recordar: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginService(formData.nombreUsuario, formData.contrasenia);

      login(data.token);
      

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-900 via-emerald-900 to-green-800 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 text-center">
        Clinica del Automovil
      </h1>

      <div className="flex flex-col-reverse md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Columna izquierda - Formulario */}
        <div className="w-full md:w-1/2 bg-[#0d1a0f] p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Iniciar sesión</h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            Por favor ingrese sus datos de acceso
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Usuario */}
            <div>
              <label htmlFor="nombreUsuario" className="block text-gray-300 mb-2">Nombre de Usuario</label>
              <input
                id="nombreUsuario"
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="contrasenia" className="block text-gray-300 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  id="contrasenia"
                  type={showContrasenia ? "text" : "password"}
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowContrasenia(!showContrasenia)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showContrasenia ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Recordarme */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="recordar"
                checked={formData.recordar}
                onChange={handleChange}
                className="mr-2 accent-green-600"
              />
              <span className="text-gray-300">Recordarme</span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        {/* Columna derecha */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 flex flex-col items-center justify-center p-6">
          <PaintBucket className="w-20 md:w-32 h-20 md:h-32 text-white mb-4" />
          <div className="text-white text-xl md:text-3xl font-bold opacity-80 text-center space-y-1">
            <p>Bienvenido al SGTA</p>
            <p>Sistema de Gestión de Taller Automotriz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
