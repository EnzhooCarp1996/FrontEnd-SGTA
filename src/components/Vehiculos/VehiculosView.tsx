import { useVehiculoView } from "../../hooks/Vehiculos/useVehiculosView";
import VehiculosList from "./VehiculosList";
import VehiculoForm from "./VehiculoForm";


const VehiculoView: React.FC = () => {
  const {
    vehiculos,
    clientes,
    error,
    mostrarForm,
    editarVehiculo,
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    eliminarVehiculo
  } = useVehiculoView();

  return (
    <>
      <VehiculosList
        onAddVehiculo={handleAdd}
        onEditVehiculo={handleEdit}
        eliminarVehiculo={eliminarVehiculo}
        vehiculos={vehiculos}
        clientes={clientes}
        error={error}
      />
      {mostrarForm && (
        <VehiculoForm
          vehiculo={editarVehiculo}
          onSave={handleSave}
          onCancel={handleCancel}
          clientes={clientes}
        />
      )}
    </>
  );
};

export default VehiculoView;
