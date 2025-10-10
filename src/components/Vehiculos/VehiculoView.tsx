import { useVehiculoView } from "../../hooks/Vehiculos/useVehiculosView";
import { VehiculosList } from "./VehiculosList";
import { VehiculoForm } from "./VehiculoForm";


export const VehiculoView: React.FC = () => {
  const { clientes, mostrarForm, editarVehiculo, handleAdd, handleEdit, handleSave, handleCancel } = useVehiculoView();

  return (
    <>
      <VehiculosList
        onAddVehiculo={handleAdd}
        onEditVehiculo={handleEdit}
      />
      {mostrarForm && (
        <VehiculoForm
          vehiculo={editarVehiculo}
          clientes={clientes}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};


