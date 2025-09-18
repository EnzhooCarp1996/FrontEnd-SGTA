import React from "react";

interface CabeceraEntidadProps {
    titulo: string;
    textoGestion: string;
}

export const CabeceraEntidad: React.FC<CabeceraEntidadProps> = ({ titulo, textoGestion }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900">{titulo}</h2>
            <p className="text-gray-600">Gestiona {textoGestion}</p>
        </div>
    );
};