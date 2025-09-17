import { Search, Car } from "lucide-react";
import { useVehiculos, filtrarVehiculos } from "../../hooks/useVehiculos";
import { VehiculoCard } from "./VehiculoCard";
import { HeaderEntidad } from "../HeaderEntidad/HeaderEntidad";
import { FiltrosEntidad } from "../FiltrosEntidad/FiltrosEntidad";
import { EntidadNotFound } from "../EntidadNotFound/EntidadNotFound";
import { useState } from "react";
import { Cliente, Vehiculo } from "../../types";


interface VehiculosListProps {
  onAddVehiculo: () => void;
  onEditVehiculo: (vehiculo: Vehiculo) => void;
  eliminarVehiculo: (id: number) => void;
  vehiculos: Vehiculo[];
  clientes: Cliente[];
  error: string | null;
}


const estados = [
  { value: "all", label: "Todos los estados" },
  { value: "No Recibido", label: "No Recibido" },
  { value: "Recibido", label: "Recibido" },
  { value: "Proceso", label: "En Proceso" },
  { value: "Entregado", label: "Entregado" },
];

const VehiculosList: React.FC<VehiculosListProps> = ({ onAddVehiculo, onEditVehiculo }) => {
  const token = localStorage.getItem("token");

  const { vehiculos, clientes, error, eliminarVehiculo } = useVehiculos(token);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("all");
  const filteredVehiculos = filtrarVehiculos(vehiculos, searchTerm, filterEstado);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <HeaderEntidad
        titulo="Vehículos"
        textoGestion="los vehículos en el taller"
        onClick={onAddVehiculo}
        textoBoton="Agregar Vehículo"
      />

      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por patente, marca o modelo..."
        buscadorValue={searchTerm}
        onBuscadorChange={e => setSearchTerm(e.target.value)}
        selectValue={filterEstado}
        onSelectChange={e => setFilterEstado(e.target.value)}
        selectOptions={estados}
      />

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