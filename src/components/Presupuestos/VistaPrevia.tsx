import { ResumenVistaPrevia } from './VistaPreviaComponents/ResumenVistaPrevia';
import { HeaderVistaPrevia } from './VistaPreviaComponents/HeaderVistaPrevia';
import { useVistaPrevia } from '../../hooks/Presupuestos/useVistaPrevia';
import { BotonAccion } from './VistaPreviaComponents/BotonAccion';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PresupuestoPDF } from './PresupuestoPDF';
import { Download, Save } from 'lucide-react';
import { NewPresupuesto } from '../../types';

interface VistaPreviaProps {
    presupuesto: NewPresupuesto;
    onClose: () => void;
    onSave: () => void;
}

export const VistaPrevia: React.FC<VistaPreviaProps> = ({ presupuesto, onClose, onSave }) => {
    const { pdfKey, presupuestoConTotal, totalCalculado, handleOnlySave, handleSaveAndDownload } = useVistaPrevia(presupuesto, onSave, onClose);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] flex flex-col border-2 border-black overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header con controles */}
                <HeaderVistaPrevia title={`Presupuesto - ${presupuesto.cliente}`} onClose={onClose} />

                {/* Contenedor principal */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Contenedor del PDF Viewer */}
                    <div className="flex-1 bg-gray-100 p-2 sm:p-4 overflow-auto">
                        <div className="border rounded-lg bg-white w-full aspect-[8.5/11] max-w-full mx-auto">
                            <PDFViewer key={pdfKey} className="w-full h-full" style={{ width: "100%", height: "100%" }}>
                                <PresupuestoPDF presupuesto={presupuestoConTotal} />
                            </PDFViewer>
                        </div>
                    </div>

                    {/* Resumen rapido */}
                    <ResumenVistaPrevia presupuesto={presupuesto} totalCalculado={totalCalculado} />

                    {/* Botones */}
                    <div className="flex flex-wrap justify-center sm:justify-end gap-3 p-4 border-b bg-gray-50">
                        {/* Boton para guardar y descargar PDF */}
                        <BotonAccion onClick={handleSaveAndDownload} icon={Download} label="Guardar y Descargar" color="blue" />

                        {/* Boton para solo guardar */}
                        <BotonAccion onClick={handleOnlySave} icon={Save} label="Solo Guardar" color="green" />

                        {/* Boton para solo descargar PDF */}
                        <PDFDownloadLink
                            document={<PresupuestoPDF presupuesto={presupuestoConTotal} />}
                            fileName={`Presupuesto_${presupuesto.cliente?.replace(/\s+/g, "_")}_${presupuesto.fecha}.pdf`}
                        >
                            <BotonAccion icon={Download} label="Solo Descargar" color="gray" />
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
