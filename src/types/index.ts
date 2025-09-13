export interface Cliente {
  idCliente: string;
  telefono: string;
  celular: string;
  responsabilidad: 'Consumidor Final' | 'Monotributista' | 'Responsable Inscripto';
  tipoDocumento: 'DNI' | 'CUIL' | 'CUIT';
  documento: string;
  tipoCliente: 'Persona' | 'Empresa';
  nombre: string;
  apellido: string;
  razonSocial: string;
  nombreDeFantasia: string;
}

export interface Presupuesto {
  idPresupuesto: string;
  fecha: string;
  manoDeObraChapa: number;
  manoDeObraPintura: number;
  totalRepuestos: number;
  idCliente: number
}

export interface Vehiculo {
  idVehiculo: string;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  nroDeChasis: string;
  estado: 'Recibido' | 'No Recibido' | 'Proceso' | 'Entregado';
  fechaRecibido?: string;
  fechaEsperada?: string;
  fechaEntrega?: string;
  descripcionTrabajos: string;
  idCliente: number;
}

