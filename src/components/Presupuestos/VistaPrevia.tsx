// components/Presupuestos/VistaPrevia.tsx
import { NewPresupuesto } from '../../types';
import { X, Download, Save } from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PresupuestoPDF from './PresupuestoPdf';
import { useEffect, useState } from 'react';

interface VistaPreviaProps {
    presupuesto: NewPresupuesto;
    onClose: () => void;
    onSave: () => void;
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ presupuesto, onClose, onSave }) => {
    const totalImporte = presupuesto.items.reduce((sum, item) => sum + item.importe, 0);
    const [pdfKey, setPdfKey] = useState(0);

    useEffect(() => {
        setPdfKey(prev => prev + 1);
    }, []);
    const handleReloadPDF = () => {
        setPdfKey(prev => prev + 1);
    };

    // Calcular total completo
    const totalCalculado =
        Number(presupuesto.manoDeObraChapa || 0) +
        Number(presupuesto.manoDeObraPintura || 0) +
        Number(presupuesto.mecanica || 0) +
        Number(presupuesto.electricidad || 0) +
        Number(totalImporte || 0);

    // Crear copia del presupuesto con el total calculado
    const presupuestoConTotal = {
        ...presupuesto,
        total: totalCalculado
    };

    const handleSaveAndDownload = () => {
        onSave(); // Guarda en la base de datos
        // La descarga del PDF se maneja automáticamente con PDFDownloadLink
    };

    const handleOnlySave = () => {
        onSave(); // Solo guarda sin descargar
        onClose(); // Cierra el modal
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white rounded-lg w-full max-w-7xl h-[95vh] flex flex-col border-2 border-black overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header con controles */}
                <div className="flex justify-between items-center p-4 border-b bg-white">
                    <h2 className="text-xl font-bold text-gray-800">
                        Vista Previa del Presupuesto - {presupuesto.cliente}
                    </h2>
                    <div className="flex items-center gap-3">
                        {/* Botón para solo guardar */}
                        <button
                            onClick={handleReloadPDF}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Actualizar Vista PDF
                        </button>
                        <button
                            onClick={handleOnlySave}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Solo Guardar
                        </button>

                        {/* Botón para guardar y descargar PDF */}
                        <PDFDownloadLink
                            document={<PresupuestoPDF presupuesto={presupuestoConTotal} />}
                            fileName={`Presupuesto_${presupuesto.cliente?.replace(/\s+/g, "_")}_${presupuesto.fecha}.pdf`}
                            onClick={handleSaveAndDownload}
                        >
                            {({ loading }) => (
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${loading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    disabled={loading}
                                >
                                    <Download className="w-4 h-4" />
                                    {loading ? 'Generando...' : 'Guardar y Descargar PDF'}
                                </button>
                            )}
                        </PDFDownloadLink>

                        {/* Botón para solo descargar PDF */}
                        <PDFDownloadLink
                            document={<PresupuestoPDF presupuesto={presupuestoConTotal} />}
                            fileName={`Presupuesto_${presupuesto.cliente?.replace(/\s+/g, "_")}_${presupuesto.fecha}.pdf`}
                        >
                            {({ loading }) => (
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                                        }`}
                                    disabled={loading}
                                >
                                    <Download className="w-4 h-4" />
                                    {loading ? 'Generando...' : 'Solo Descargar PDF'}
                                </button>
                            )}
                        </PDFDownloadLink>


                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            title="Cerrar vista previa"
                        >
                            <X className="w-4 h-4" />
                            Cerrar
                        </button>
                    </div>
                </div>

                {/* Contenedor principal con pestañas */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Pestañas para cambiar entre vista HTML y PDF */}
                    <div className="flex border-b bg-gray-50">
                        <button
                            className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600"
                        >
                            Vista PDF
                        </button>
                    </div>

                    {/* Contenedor del PDF Viewer */}
                    <div className="flex-1 bg-gray-100 p-4">
                        <div className="h-full border rounded-lg overflow-hidden bg-white">
                            <PDFViewer key={pdfKey} width="100%" height="100%" className="rounded-lg">
                                <PresupuestoPDF presupuesto={presupuestoConTotal} />
                            </PDFViewer>
                        </div>
                    </div>

                    {/* Resumen rápido en footer */}
                    <div className="border-t bg-white p-3">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex gap-6">
                                <span><strong>Cliente:</strong> {presupuesto.cliente}</span>
                                <span><strong>Vehículo:</strong> {presupuesto.vehiculo}</span>
                                <span><strong>Patente:</strong> {presupuesto.patente}</span>
                                <span><strong>Total:</strong> ${totalCalculado.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {presupuesto.items.length} items presupuestados
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VistaPrevia;