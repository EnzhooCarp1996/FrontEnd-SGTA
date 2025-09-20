import { filtrarClientes } from '../../helpers/utilsClientes';
import { EntidadNotFound } from '../Shared/EntidadNotFound';
import { FiltrosEntidad } from '../Shared/FiltrosEntidad';
import { HeaderEntidad } from '../Shared/HeaderEntidad';
import { useClientes } from '../../hooks/useClientes';
import { Search, User } from 'lucide-react';
import { ClienteCard } from './ClienteCard';
import { Cliente } from '../../types';
import { useState } from "react";


interface ClientesListProps {
  onAddCliente: () => void;
  onEditCliente: (cliente: Cliente) => void;
  eliminarCliente: (id: number) => void;
  clientes: Cliente[];
  error: string | null;
}

const tipos: { value: 'all' | 'persona' | 'empresa'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'persona', label: 'Personas' },
  { value: 'empresa', label: 'Empresas' },
];

const ClientesList: React.FC<ClientesListProps> = ({ onAddCliente, onEditCliente }) => {
  const { clientes, error, eliminarCliente } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterType] = useState<"all" | "persona" | "empresa">("all");
  const filteredClientes = filtrarClientes(clientes, searchTerm, filterTipo);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <HeaderEntidad titulo="Clientes" textoGestion="la información de tus clientes" onClick={onAddCliente} textoBoton="Agregar Cliente" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar por nombre o apellido..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        buscadorName="buscadorCliente"
        buscadorId="buscadorCliente"

        selectValue={filterTipo}
        onSelectChange={(e) => setFilterType(e.target.value as 'all' | 'persona' | 'empresa')}
        selectOptions={tipos}
        selectName="estadoCliente"
        selectId="estadoCliente"
      />

      {/* Clientes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredClientes.map((cliente) => (
          <ClienteCard
            key={cliente.idCliente}
            cliente={cliente}
            onEdit={onEditCliente}
            onDelete={eliminarCliente}
          />
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <EntidadNotFound
          icon={<User className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
          titulo="clientes"
        />
      )}
    </div>
  );
};

export default ClientesList;