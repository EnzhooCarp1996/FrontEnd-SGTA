export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  contrasenia: string;
  rol: "Admin" | "Encargado" | "Empleado";
}

export interface Cliente {
  idCliente: number;
  telefono?: string;
  celular?: string;
  responsabilidad:
    | "ConsumidorFinal"
    | "Monotributista"
    | "ResponsableInscripto";
  tipoDocumento: "DNI" | "CUIL" | "CUIT";
  documento: string;
  tipoCliente: "Persona" | "Empresa";
  nombre?: string;
  apellido?: string;
  razonSocial?: string;
  nombreDeFantasia?: string;
}

export interface Vehiculo {
  idVehiculo: number;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  nroDeChasis: string;
  estado: "Recibido" | "No Recibido" | "Proceso" | "Entregado";
  fechaRecibido?: string | null;
  fechaEsperada?: string | null;
  fechaEntrega?: string | null;
  descripcionTrabajos?: string;
  idCliente?: number;
}

export interface Presupuesto {
  idPresupuesto: number;
  fecha: string;
  manoDeObraChapa: number;
  manoDeObraPintura: number;
  totalRepuestos: number;
  idCliente: number;
}

export interface PresupuestoItem {
  id: number;
  descripcion: string;
  ubicacion: string;
  a: string;
  b: string;
  observaciones: string;
  importe: number;
}

export interface PresupuestoData {
  idPresupuesto: number;
  fecha: string;
  idCliente?: number,
  cliente: string;
  domicilio: string;
  poliza: string;
  idVehiculo?: number;
  vehiculo: string;
  patente: string;
  siniestro: string;
  chapa: number;
  pintura: number;
  mecanica: number;
  electricidad: number;
  repuestos: number;
  lugarFecha: string;
  firmaCliente: string;
  firmaResponsable: string;
  observaciones: string;
  ruedaAuxilio: string;
  encendedor: string;
  cricket: string;
  herramientas: string;
  total: number;
  items: PresupuestoItem[];
}

export type NewUsuario = Omit<Usuario, "idUsuario">;
export type NewVehiculo = Omit<Vehiculo, "idVehiculo">;
export type NewCliente = Omit<Cliente, "idCliente">;
export type NewPresupuesto = Omit<Presupuesto, "idPresupuesto">;

export type NodoParte = {
  [key: string]: NodoParte | string[] | null;
};

export type EstructuraPartes = {
  [key: string]: NodoParte;  // índice genérico
};