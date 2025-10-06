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
