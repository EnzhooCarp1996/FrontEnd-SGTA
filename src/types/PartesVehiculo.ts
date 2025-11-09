export interface Detalle {
  nombre: string;
}

export interface Subcomponente {
  nombre: string;
  detalles?: string[];
}

export interface Componente {
  nombre: string;
  subcomponentes?: Subcomponente[];
}

export interface PartesVehiculo {
  categoria: string;
  componentes: Componente[];
}

export type EstructuraPartes = {
  [categoria: string]: {
    [componente: string]:
    | null // ej: "Panel" (sin subcomponentes ni detalles)
    | {
      [subcomponente: string]: string[]; // ej: "delantera": ["cristal", "moldura"]
    };
  };
};

export interface NuevaParteDto {
  categoria: string;
  componente: string;
}