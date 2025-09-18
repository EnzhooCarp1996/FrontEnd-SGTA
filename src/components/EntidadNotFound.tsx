import React from 'react';

interface EntidadNotFoundProps {
  icon: React.ReactNode;
  titulo: string;
}

export const EntidadNotFound: React.FC<EntidadNotFoundProps> = ({ icon, titulo}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-4 w-12 h-12 text-gray-400">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron {titulo}</h3>
      <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
    </div>
  );
};
