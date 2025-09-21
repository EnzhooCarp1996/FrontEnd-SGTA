import { filtrarVehiculos } from "../../helpers/utilsVehiculos";
import { EntidadNotFound } from "../Shared/EntidadNotFound";
import { FiltrosEntidad } from "../Shared/FiltrosEntidad";
import { HeaderEntidad } from "../Shared/HeaderEntidad";
import { useVehiculos } from "../../hooks/Vehiculos/useVehiculos";
import { useClientes } from "../../hooks/Clientes/useClientes";
import { Cliente, Vehiculo } from "../../types";
import { VehiculoCard } from "./VehiculoCard";
import { Search, Car } from "lucide-react";
import { useState } from "react";


interface VehiculosListProps {
  onAddVehiculo: () => void;
  onEditVehiculo: (vehiculo: Vehiculo) => void;
  eliminarVehiculo: (id: number) => void;
  vehiculos: Vehiculo[];
  clientes: Cliente[];
  error: string | null;
}


const VehiculosList: React.FC<VehiculosListProps> = ({ onAddVehiculo, onEditVehiculo }) => {
  const { vehiculos, error, eliminarVehiculo } = useVehiculos();
  const { clientes } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("all");
  const filteredVehiculos = filtrarVehiculos(vehiculos, searchTerm, filterEstado);
  const estados = [
    { value: "all", label: "Todos los estados" },
    { value: "No Recibido", label: "No Recibido" },
    { value: "Recibido", label: "Recibido" },
    { value: "Proceso", label: "En Proceso" },
    { value: "Entregado", label: "Entregado" },
  ];

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <HeaderEntidad titulo="Vehículos" textoGestion="los vehículos del taller" onClick={onAddVehiculo} textoBoton="Agregar Vehículo" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por patente, marca o modelo..."
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredVehiculos.map(vehiculo => (
          <VehiculoCard
            key={vehiculo.idVehiculo}
            vehiculo={vehiculo}
            clientes={clientes}
            onEdit={onEditVehiculo}
            onDelete={eliminarVehiculo}
          />
        ))}
      </div>

      {filteredVehiculos.length === 0 && (
        <EntidadNotFound
          icon={<Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
          titulo="vehículos"
        />
      )}
    </div>
  );
};

export default VehiculosList;