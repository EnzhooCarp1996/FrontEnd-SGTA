import React, { useState } from 'react';
import { Search, Building, User } from 'lucide-react';
import { Cliente } from '../../types';
import { TarjetaSpan } from './TarjetaSpan/TarjetaSpan';
import { Contacto } from './Contacto/Contacto';
import { HeaderEntidad } from '../HeaderEntidad/HeaderEntidad';
import { EntidadNotFound } from '../EntidadNotFound/EntidadNotFound';
import { FiltrosEntidad } from '../FiltrosEntidad/FiltrosEntidad';
import { BotonesTarjeta } from '../BotonesTarjeta/BotonesTarjeta';

interface ClientesListProps {
  onAddCliente: () => void;
  onEditCliente: (cliente: Cliente) => void;
}

const ClientesList: React.FC<ClientesListProps> = ({ onAddCliente, onEditCliente }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'persona' | 'empresa'>('all');

  // Mock data - en producción vendría de una API
  const clientes: Cliente[] = [
    {
      idCliente: '1',
      tipoCliente: 'Persona',
      nombre: 'Juan',
      apellido: 'Pérez',
      razonSocial: '',
      nombreDeFantasia: '',
      telefono: '011-1234-5678',
      celular: '011-9876-5432',
      responsabilidad: 'Consumidor Final',
      tipoDocumento: 'DNI',
      documento: '12345678'
    },
    {
      idCliente: '2',
      tipoCliente: 'Empresa',
      razonSocial: 'Transportes García SRL',
      nombreDeFantasia: 'García Transporte',
      nombre: '',
      apellido: '',
      telefono: '011-5555-0000',
      celular: '011-5555-1111',
      responsabilidad: 'Responsable Inscripto',
      tipoDocumento: 'CUIT',
      documento: '20-12345678-9'
    },
    {
      idCliente: '3',
      tipoCliente: 'Persona',
      nombre: 'María',
      apellido: 'García',
      razonSocial: '',
      nombreDeFantasia: '',
      telefono: '011-2222-3333',
      celular: '011-2222-4444',
      responsabilidad: 'Monotributista',
      tipoDocumento: 'CUIL',
      documento: '27-87654321-5'
    },
    {
      idCliente: '4',
      tipoCliente: 'Persona',
      nombre: 'María',
      apellido: 'García',
      razonSocial: '',
      nombreDeFantasia: '',
      telefono: '011-2222-3333',
      celular: '011-2222-4444',
      responsabilidad: 'Monotributista',
      tipoDocumento: 'CUIL',
      documento: '27-87654321-5'
    },
    {
      idCliente: '5',
      tipoCliente: 'Persona',
      nombre: 'María',
      apellido: 'García',
      razonSocial: '',
      nombreDeFantasia: '',
      telefono: '011-2222-3333',
      celular: '011-2222-4444',
      responsabilidad: 'Monotributista',
      tipoDocumento: 'CUIL',
      documento: '27-87654321-5'
    }
  ];

  const isEmpresa = (cliente: Cliente): boolean => {
    return cliente.tipoCliente === 'Empresa';
  };


  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = isEmpresa(cliente)
      ? cliente.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nombreDeFantasia.toLowerCase().includes(searchTerm.toLowerCase())
      : `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' ||
      (filterType === 'empresa' && isEmpresa(cliente)) ||
      (filterType === 'persona' && !isEmpresa(cliente));

    return matchesSearch && matchesFilter;
  });

  const getResponsabilidadColor = (responsabilidad: string) => {
    switch (responsabilidad) {
      case 'Consumidor Final': return 'bg-blue-100 text-blue-800';
      case 'Monotributista': return 'bg-green-100 text-green-800';
      case 'Responsable Inscripto': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tipos: { value: 'all' | 'persona' | 'empresa'; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'persona', label: 'Personas' },
    { value: 'empresa', label: 'Empresas' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <HeaderEntidad
        titulo="Clientes"
        textoGestion="la información de tus clientes"
        onClick={onAddCliente}
        textoBoton="Agregar Cliente"
      />

      {/* Filters */}
      <FiltrosEntidad
        buscadorIcon={Search}
        buscadorPlaceholder="Buscar clientes por nombre o apellido..."
        buscadorValue={searchTerm}
        onBuscadorChange={(e) => setSearchTerm(e.target.value)}
        selectValue={filterType}
        onSelectChange={(e) => setFilterType(e.target.value as 'all' | 'persona' | 'empresa')}
        selectOptions={tipos}
      />


      {/* Clientes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredClientes.map((cliente) => (
          <div key={cliente.idCliente} className="bg-white rounded-lg shadow-sm border border-gray-400 p-6 hover:shadow-md
                                                   hover:border-green-500 transform hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isEmpresa(cliente) ? 'bg-purple-100' : 'bg-green-100'}`}>
                  {isEmpresa(cliente) ? (
                    <Building className={`w-5 h-5 ${isEmpresa(cliente) ? 'text-purple-600' : 'text-green-600'}`} />
                  ) : (
                    <User className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {isEmpresa(cliente) ? cliente.nombreDeFantasia : `${cliente.nombre} ${cliente.apellido}`}
                  </h3>
                  {isEmpresa(cliente) && (<p className="text-sm text-gray-500">{cliente.razonSocial}</p>)}
                </div>
              </div>

              <BotonesTarjeta
                onEdit={() => onEditCliente(cliente)}
              //onDelete={() => onDeleteCliente(cliente)}
              />

            </div>

            <div className="space-y-2 mb-4">

              <TarjetaSpan >
                <Contacto contacto={cliente.telefono} />
              </TarjetaSpan>

              <TarjetaSpan >
                <Contacto contacto={cliente.celular} />
              </TarjetaSpan>

              <TarjetaSpan >
                <span className="font-medium">{cliente.tipoDocumento}:</span>
                <span>{cliente.documento}</span>
              </TarjetaSpan>

            </div>

            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResponsabilidadColor(cliente.responsabilidad)}`}>
                {cliente.responsabilidad}
              </span>

            </div>
          </div>
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