export function getResponsabilidadColor(responsabilidad: string) {
  switch (responsabilidad) {
    case 'Consumidor Final': return 'bg-blue-100 text-blue-800';
    case 'Monotributista': return 'bg-green-100 text-green-800';
    case 'Responsable Inscripto': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
