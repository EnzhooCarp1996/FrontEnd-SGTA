export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  contrasenia: string;
  role: "Admin" | "Encargado" | "Empleado";
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

export interface PresupuestoData {
  _id: string;
  fecha: string;
  idCliente?: number;
  cliente: string;
  domicilio: string;
  poliza: string;
  idVehiculo?: number;
  vehiculo: string;
  patente: string;
  siniestro: string;
  manoDeObraChapa: number;
  manoDeObraPintura: number;
  mecanica: number;
  electricidad: number;
  totalRepuestos: number;
  lugarFecha?: string;
  firmaCliente?: string;
  firmaResponsable: string;
  observaciones: string;
  ruedaAuxilio?: string;
  encendedor?: string;
  cricket?: string;
  herramientas?: string;
  total: number;
  items: PresupuestoItem[];
}

export interface PresupuestoItem {
  id: number;
  ubicacion: string;
  descripcion: string;
  a: string;
  b: string;
  observaciones: string;
  importe: number;
  modoManual?: boolean;
}

export interface User {
  nombreUsuario: string;
  role: string;
}

export interface JwtPayload {
  exp: number;
  sub: string;
  nombreUsuario?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  nombreUsuario: string;
  role: string;
  refreshToken?: string;
  mensaje?: string;
}

export type NewUsuario = Omit<Usuario, "idUsuario">;
export type NewVehiculo = Omit<Vehiculo, "idVehiculo">;
export type NewCliente = Omit<Cliente, "idCliente">;
export type NewPresupuesto = Omit<PresupuestoData, "_id">;
