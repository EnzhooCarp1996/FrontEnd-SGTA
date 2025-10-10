import { GridColumnas } from "./ClienteFormComponents/GridColumnas";
import { RadioCardOption } from "./ClienteFormComponents/RadioCardOption";
import { useClienteForm } from "../../hooks/Clientes/useClienteForm";
import { SelectForm } from "./ClienteFormComponents/SelectForm";
import { FormGeneral } from "../Shared/FormGeneral";
import { BotonesForm } from "../Shared/BotonesForm";
import { FormField } from "../Shared/FormField";
import { Building, User } from "lucide-react";
import { Cliente } from "../../types";


interface ClienteFormProps {
  cliente?: Cliente;
  onSave: (cliente: Partial<Cliente>) => void;
  onCancel: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSave, onCancel }) => {
  const { formData, errors, tipoCliente, setTipoCliente, handleChange, handleSubmit } = useClienteForm(cliente, onSave);

  return (

    <FormGeneral icon={User} titulo="Cliente" condicion={!!cliente} onCancel={onCancel} maxWidth="max-w-3xl">

      {/* Tipo de Cliente */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de Cliente (obligatorio: <span className="text-red-500">*</span>)
        </span>
        <div className="flex space-x-4">
          <RadioCardOption name="tipoCliente" value="Persona" label="Persona" icon={User} selectedValue={tipoCliente} onChange={setTipoCliente} />
          <RadioCardOption name="tipoCliente" value="Empresa" label="Empresa" icon={Building} selectedValue={tipoCliente} onChange={setTipoCliente} />
        </div>
      </div>

      {/* Campos específicos por tipo */}
      {tipoCliente === 'Persona' ? (
        <GridColumnas>
          <FormField label="Nombre " name="nombre" value={formData.nombre} onChange={handleChange} required error={errors.nombre} />
          <FormField label="Apellido " name="apellido" value={formData.apellido} onChange={handleChange} required error={errors.apellido} />
        </GridColumnas>
      ) : (
        <GridColumnas>
          <FormField label="Razón Social " name="razonSocial" value={formData.razonSocial} onChange={handleChange} required error={errors.razonSocial} />
          <div>
            <FormField label="Nombre de Fantasía " name="nombreDeFantasia" value={formData.nombreDeFantasia} onChange={handleChange} />
          </div>
        </GridColumnas>
      )}

      {/* Contacto */}
      <GridColumnas>
        <FormField label="Teléfono " type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required error={errors.telefono} />
        <div>
          <FormField label="Celular " type="tel" name="celular" value={formData.celular} onChange={handleChange} />
        </div>
      </GridColumnas>

      {/* Responsabilidad */}
      <SelectForm
        id="responsabilidad"
        name="responsabilidad"
        label="Responsabilidad Fiscal"
        value={formData.responsabilidad}
        onChange={handleChange}
        required
        error={errors.responsabilidad}
        options={
          tipoCliente === "Empresa"
            ? [{ value: "ResponsableInscripto", label: "Responsable Inscripto" }]
            : [
              { value: "ConsumidorFinal", label: "Consumidor Final" },
              { value: "Monotributista", label: "Monotributista" },
            ]
        }
      />

      {/* Tipo de Documento */}
      <GridColumnas>
        <SelectForm
          id="tipoDocumento"
          name="tipoDocumento"
          label="Tipo de Documento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          required
          error={errors.tipoDocumento}
          options={
            tipoCliente === "Persona" && formData.responsabilidad === "ConsumidorFinal"
              ? [
                { value: "DNI", label: "DNI" },
                { value: "CUIL", label: "CUIL" },
              ]
              : [{ value: "CUIT", label: "CUIT" }]
          }
        />
        <FormField label="Número de Documento " name="documento" value={formData.documento} onChange={handleChange} required error={errors.documento} />
      </GridColumnas>

      {/* Botones */}
      <BotonesForm
        onGuardar={handleSubmit}
        onCancel={onCancel}
      />
    </FormGeneral>
  );
};

