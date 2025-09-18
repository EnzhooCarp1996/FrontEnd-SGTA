import { Search, User } from 'lucide-react';
import { Cliente } from '../../types';
import { HeaderEntidad } from '../HeaderEntidad';
import { EntidadNotFound } from '../EntidadNotFound';
import { FiltrosEntidad } from '../FiltrosEntidad';
import { useClientes, useClienteFilters } from '../../hooks/useClientes';
import { ClienteCard } from './ClienteCard';


interface ClientesListProps {
  onAddCliente: () => void;
  onEditCliente: (cliente: Cliente) => void;
}

const ClientesList: React.FC<ClientesListProps> = ({ onAddCliente, onEditCliente }) => {
  const token = localStorage.getItem("token");
  const { clientes, eliminarCliente, error } = useClientes(token);
  const { filteredClientes, searchTerm, setSearchTerm, filterType, setFilterType } = useClienteFilters(clientes);

  if (error) return <p>{error}</p>;

  const tipos: { value: 'all' | 'persona' | 'empresa'; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'persona', label: 'Personas' },
    { value: 'empresa', label: 'Empresas' },
  ];

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
        selectValue={filterType}
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