import { useVehiculosList } from "../../hooks/Vehiculos/useVehiculosList";
import { EntidadNotFound } from "../Shared/EntidadNotFound";
import { FiltrosEntidad } from "../Shared/FiltrosEntidad";
import { HeaderEntidad } from "../Shared/HeaderEntidad";
import { estados } from "../../helpers/utilsVehiculos";
import { usePermisos } from "../../hooks/usePermisos";
import { VehiculoCard } from "./VehiculoCard";
import { Search, Car } from "lucide-react";
import { Vehiculo } from "../../types";

interface VehiculosListProps {
  onAddVehiculo: () => void;
  onEditVehiculo: (vehiculo: Vehiculo) => void;
}

export const VehiculosList: React.FC<VehiculosListProps> = ({ onAddVehiculo, onEditVehiculo }) => {
  const { error, clientes, eliminarVehiculo, filteredVehiculos, searchTerm, setSearchTerm, filterEstado, setFilterEstado } = useVehiculosList();
  const { puedeModificar } = usePermisos();

  if (error) return <p>{error}</p>;

  return (
    <>
      {/* Header */}
      <HeaderEntidad titulo="Vehículos" textoGestion="los vehículos del taller" onClick={onAddVehiculo} textoBoton="Vehículo" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="patente, marca o modelo"
        buscadorValue={searchTerm}
        onBuscadorChange={e => setSearchTerm(e.target.value)}
        buscadorName="buscadorVehiculo"
        buscadorId="buscadorVehiculo"
        selectValue={filterEstado}
        onSelectChange={e => setFilterEstado(e.target.value)}
        selectOptions={estados}
        selectName="estadoVehiculo"
        selectId="estadoVehiculo"
      />

      {/* Vehiculos Grid */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-4">
        {filteredVehiculos.map(vehiculo => (
          <VehiculoCard
            key={vehiculo.idVehiculo}
            vehiculo={vehiculo}
            clientes={clientes}
            onEdit={puedeModificar ? onEditVehiculo : () => { }}
            onDelete={puedeModificar ? eliminarVehiculo : () => { }}
          />
        ))}
      </div>

      {filteredVehiculos.length === 0 && (
        <EntidadNotFound icon={<Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />} titulo="vehículos" />
      )}
    </>
  );
};

