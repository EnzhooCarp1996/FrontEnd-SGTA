import React, { useState } from 'react';
import { Building, User } from 'lucide-react';
import { Cliente } from '../../types';
import { InputForm } from '../Shared/InputForm';
import { BotonesForm } from '../Shared/BotonesForm';
import { HeaderForm } from '../Shared/HeaderForm';

interface ClienteFormProps {
  cliente?: Cliente;
  onSave: (cliente: Partial<Cliente>) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSave, onCancel }) => {
  const [tipoCliente, setTipoCliente] = useState<'persona' | 'empresa'>(
    cliente?.tipoCliente === 'Empresa' ? 'empresa' : 'persona'
  );


  const [formData, setFormData] = useState({
    // Datos
    telefono: cliente?.telefono || '',
    celular: cliente?.celular || '',
    responsabilidad: cliente?.responsabilidad || '',
    tipoDocumento: cliente?.tipoDocumento || "",
    documento: cliente?.documento || '',
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    razonSocial: cliente?.razonSocial || '',
    nombreFantasia: cliente?.nombreDeFantasia || '',

  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseData = {
      telefono: formData.telefono,
      celular: formData.celular,
      responsabilidad: formData.responsabilidad as 'Consumidor Final' | 'Monotributista' | 'Responsable Inscripto',
      tipo: formData.tipoDocumento as 'DNI' | 'CUIL' | 'CUIT',
      documento: formData.documento,
    };

    if (tipoCliente === 'persona') {
      onSave({
        ...baseData,
        nombre: formData.nombre,
        apellido: formData.apellido,
        idCliente: cliente?.idCliente || Date.now(),
      });
    } else {
      onSave({
        ...baseData,
        razonSocial: formData.razonSocial,
        nombreDeFantasia: formData.nombreFantasia,
        idCliente: cliente?.idCliente || Date.now(),
      });
    }

  };

  const formatDocumento = (value: string, tipo: string) => {
    // Eliminar todo lo que no sea número
    const numbers = value.replace(/\D/g, "");

    if (tipo === "CUIL" || tipo === "CUIT") {
      // Armar formato ##-########-#
      const parte1 = numbers.slice(0, 2);
      const parte2 = numbers.slice(2, 10);
      const parte3 = numbers.slice(10, 11);

      let result = parte1;
      if (parte2) result += "-" + parte2;
      if (parte3) result += "-" + parte3;

      return result;
    }

    // Si es DNI → solo números
    return numbers;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "documento") {
      newValue = formatDocumento(value, formData.tipoDocumento);
    }

    // Filtrar solo números para teléfono y celular
    if (name === "telefono" || name === "celular") {
      newValue = value.replace(/\D/g, ""); // elimina todo lo que no sea dígito
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Cliente */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Cliente (obligatorio: <span className="text-red-500">*</span>) 
            </span>
            <div className="flex space-x-4">
              <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${tipoCliente === 'persona'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                <input
                  type="radio"
                  name="tipoCliente"
                  value="persona"
                  checked={tipoCliente === 'persona'}
                  onChange={() => setTipoCliente('persona')}
                  className="hidden"
                />
                <User className="w-5 h-5" />
                <span>Persona</span>
              </label>

              <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${tipoCliente === 'empresa'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                <input
                  type="radio"
                  name="tipoCliente"
                  value="empresa"
                  checked={tipoCliente === 'empresa'}
                  onChange={() => setTipoCliente('empresa')}
                  className="hidden"
                />
                <Building className="w-5 h-5" />
                <span>Empresa</span>
              </label>
            </div>
          </div>

          {/* Campos específicos por tipo */}
          {tipoCliente === 'persona' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InputForm label="Nombre " name="nombre" value={formData.nombre} onChange={handleChange} required />
              <InputForm label="Apellido " name="apellido" value={formData.apellido} onChange={handleChange} required />

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InputForm label="Razón Social " name="razonSocial" value={formData.razonSocial} onChange={handleChange} required />
              <InputForm label="Nombre de Fantasía " name="nombreFantasia" value={formData.nombreFantasia} onChange={handleChange} />

            </div>
          )}

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <InputForm label="Teléfono " type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            <InputForm label="Celular " type="tel" name="celular" value={formData.celular} onChange={handleChange} />

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

              {tipoCliente === "empresa" ? (
                <option value="Responsable Inscripto">Responsable Inscripto</option>
              ) : (
                <>
                  <option value="Consumidor Final">Consumidor Final</option>
                  <option value="Monotributista">Monotributista</option>
                </>
              )}

            </select>
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

                {((tipoCliente === 'persona') && (formData.responsabilidad === 'Consumidor Final')) ?
                  (<>
                    <option value="DNI">DNI</option>
                    <option value="CUIL">CUIL</option>
                  </>
                  ) : (
                    <option value="CUIT">CUIT</option>)}
              </select>
            </div>

            <InputForm label="Número de Documento " name="documento" value={formData.documento} onChange={handleChange} required />

          </div>



          {/* Botones */}
          <BotonesForm
            // onGuardar={handleGuardar}
            onCancel={onCancel}
          />

        </form>
      </div>
    </div>
  );
};

export default ClienteForm;