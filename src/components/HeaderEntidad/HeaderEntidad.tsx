import React from 'react';
import { BotonAgregar } from '../BotonAgregar/BotonAgregar';
import { CabeceraEntidad } from '../CabeceraEntidad/CabeceraEntidad';

interface HeaderEntidadProps {
  titulo: string;
  textoGestion: string;
  onClick: () => void;
  textoBoton: string;
}

export const HeaderEntidad: React.FC<HeaderEntidadProps> = ({ titulo, textoGestion, onClick, textoBoton }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <CabeceraEntidad titulo={titulo} textoGestion={textoGestion} />
      <BotonAgregar onClick={onClick} textoAgregar={textoBoton} />
    </div>
  );
};
