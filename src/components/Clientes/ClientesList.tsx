import { useClientesList } from '../../hooks/Clientes/useClientesList';
import { ClienteCard } from './ClientesListComponents/ClienteCard';
import { EntidadNotFound } from '../Shared/EntidadNotFound';
import { FiltrosEntidad } from '../Shared/FiltrosEntidad';
import { HeaderEntidad } from '../Shared/HeaderEntidad';
import { usePermisos } from '../../hooks/usePermisos';
import { tipos } from '../../helpers/utilsClientes';
import { Search, User } from 'lucide-react';
import { Cliente } from '../../types';

interface ClientesListProps {
  onAddCliente: () => void;
  onEditCliente: (cliente: Cliente) => void;
}

export const ClientesList: React.FC<ClientesListProps> = ({ onAddCliente, onEditCliente }) => {
  const { errorCliente, eliminarCliente, searchTerm, setSearchTerm, filterTipo, setFilterType, filteredClientes } = useClientesList();
  const { puedeModificar } = usePermisos();

  if (errorCliente) return <p>{errorCliente}</p>;

  return (
    <>
      {/* Header */}
      <HeaderEntidad titulo="Clientes" textoGestion="la información de tus clientes" onClick={onAddCliente} textoBoton="Cliente" />

      {/* Filtros */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="nombre o apellido"
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
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-4">
        {filteredClientes.map((cliente) => (
          <ClienteCard
            key={cliente.idCliente}
            cliente={cliente}
            onEdit={puedeModificar ? onEditCliente : () => { }}
            onDelete={puedeModificar ? eliminarCliente : () => { }}
          />
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <EntidadNotFound icon={<User className="w-12 h-12 text-gray-400 mx-auto mb-4" />} titulo="clientes" />
      )}
    </>
  );
};

