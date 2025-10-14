import { useVistaPrevia } from '../../hooks/Presupuestos/useVistaPrevia';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { formatearImporte } from '../../helpers/utilsPresupuestos';
import { PresupuestoPDF } from './PresupuestoPDF';
import { X, Download, Save } from 'lucide-react';
import { NewPresupuesto } from '../../types';

interface VistaPreviaProps {
    presupuesto: NewPresupuesto;
    onClose: () => void;
    onSave: () => void;
}

export const VistaPrevia: React.FC<VistaPreviaProps> = ({ presupuesto, onClose, onSave }) => {
    const { pdfKey, presupuestoConTotal, totalCalculado, handleOnlySave } = useVistaPrevia(presupuesto, onSave, onClose);

    const handleSaveAndDownload = async () => {
        await onSave();

        // Generar blob del PDF
        const blob = await pdf(<PresupuestoPDF presupuesto={presupuestoConTotal} />).toBlob();

        // Crear enlace y descargar
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Presupuesto_${presupuesto.cliente?.replace(/\s+/g, "_")}_${presupuesto.fecha}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
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
                        Presupuesto - {presupuesto.cliente}
                    </h2>
                    <div className="flex items-center gap-3">
                        {/* Botón para guardar y descargar PDF */}

                        <button
                            onClick={handleSaveAndDownload}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Guardar y Descargar
                        </button>

                        {/* Botón para solo guardar */}
                        <button
                            onClick={handleOnlySave}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Solo Guardar
                        </button>

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
                                    {loading ? 'Generando...' : 'Solo Descargar'}
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
                                <span><strong>Total:</strong> $ {formatearImporte(totalCalculado)}</span>
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
