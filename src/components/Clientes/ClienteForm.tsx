import { useClienteForm } from "../../hooks/Clientes/useClienteForm";
import { BotonesForm } from "../Shared/BotonesForm";
import { HeaderForm } from "../Shared/HeaderForm";
import { InputForm } from "../Shared/InputForm";
import { Building, User } from "lucide-react";
import { Cliente } from "../../types";


interface ClienteFormProps {
  cliente?: Cliente;
  onSave: (cliente: Partial<Cliente>) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSave, onCancel }) => {
  const {
    formData,
    errors,
    tipoCliente,
    setTipoCliente,
    handleChange,
    handleSubmit,
  } = useClienteForm(cliente, onSave);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border-2 border-black shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        <HeaderForm
          icon={User}
          tituloNuevo="Nuevo Cliente"
          tituloEditar="Editar Cliente"
          condicion={!!cliente}
          onCancel={onCancel}
        />

        <form className="p-6 space-y-6">
          {/* Tipo de Cliente */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Cliente (obligatorio: <span className="text-red-500">*</span>)
            </span>
            <div className="flex space-x-4">
              <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${tipoCliente === 'Persona'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                <input
                  type="radio"
                  name="tipoCliente"
                  value="Persona"
                  checked={tipoCliente === 'Persona'}
                  onChange={() => setTipoCliente('Persona')}
                  className="hidden"
                />
                <User className="w-5 h-5" />
                <span>Persona</span>
              </label>

              <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${tipoCliente === 'Empresa'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                <input
                  type="radio"
                  name="tipoCliente"
                  value="Empresa"
                  checked={tipoCliente === 'Empresa'}
                  onChange={() => setTipoCliente('Empresa')}
                  className="hidden"
                />
                <Building className="w-5 h-5" />
                <span>Empresa</span>
              </label>
            </div>
          </div>

          {/* Campos específicos por tipo */}
          {tipoCliente === 'Persona' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputForm label="Nombre " name="nombre" value={formData.nombre} onChange={handleChange} required error={errors.nombre} />
              <InputForm label="Apellido " name="apellido" value={formData.apellido} onChange={handleChange} required error={errors.apellido} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputForm label="Razón Social " name="razonSocial" value={formData.razonSocial} onChange={handleChange} required error={errors.razonSocial} />
              <div>
                <InputForm label="Nombre de Fantasía " name="nombreDeFantasia" value={formData.nombreDeFantasia} onChange={handleChange} />
              </div>
            </div>
          )}

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm label="Teléfono " type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required error={errors.telefono} />
            <div>
              <InputForm label="Celular " type="tel" name="celular" value={formData.celular} onChange={handleChange} />
            </div>
          </div>

          {/* Responsabilidad */}
          <div>
            <label htmlFor="responsabilidad" className="block text-sm font-medium text-gray-700 mb-2">
              Responsabilidad Fiscal <span className="text-red-500">*</span>
            </label>
            <select
              id="responsabilidad"
              name="responsabilidad"
              value={formData.responsabilidad}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" disabled>
                Seleccione una opción
              </option>

              {tipoCliente === "Empresa" ? (
                <option value="ResponsableInscripto">Responsable Inscripto</option>
              ) : (
                <>
                  <option value="ConsumidorFinal">Consumidor Final</option>
                  <option value="Monotributista">Monotributista</option>
                </>
              )}

            </select>
            {errors.responsabilidad && <p className="text-red-500 text-sm">{errors.responsabilidad}</p>}
          </div>

          {/* Tipo de Documento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento <span className="text-red-500">*</span>
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>

                {((tipoCliente === 'Persona') && (formData.responsabilidad === 'ConsumidorFinal')) ?
                  (<>
                    <option value="DNI">DNI</option>
                    <option value="CUIL">CUIL</option>
                  </>
                  ) : (
                    <option value="CUIT">CUIT</option>)}
              </select>
              {errors.tipoDocumento && <p className="text-red-500 text-sm">{errors.tipoDocumento}</p>}
            </div>
            <InputForm label="Número de Documento " name="documento" value={formData.documento} onChange={handleChange} required error={errors.documento} />
          </div>

          {/* Botones */}
          <BotonesForm
            onGuardar={handleSubmit}
            onCancel={onCancel}
          />
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;