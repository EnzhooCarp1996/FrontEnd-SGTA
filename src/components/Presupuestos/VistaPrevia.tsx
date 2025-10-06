// import html2pdf from 'html2pdf.js';
import { X } from 'lucide-react';
import { useRef } from 'react';
import { NewPresupuesto } from '../../types';


interface VistaPreviaProps {
    presupuesto: NewPresupuesto,
    onClose: () => void;
    onSave: () => void;
}

const formatearFecha = (iso: string): string => {
    const [año, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${año}`;
};

const ubicaciones = [
    'PARTE DELANTERA',
    'PARTE TRASERA',
    'INTERIOR',
    'LADO DERECHO',
    'LADO IZQUIERDO',
    'MOTOR',
    'CHASIS',
    'TREN DELANTERO',
    'TREN TRASERO',
    'TRANSMISION',
    'DIRECCION',
];

const VistaPrevia: React.FC<VistaPreviaProps> = ({ presupuesto, onClose, onSave }) => {
    const pdfRef = useRef<HTMLDivElement>(null);
    const totalImporte = presupuesto.items.reduce((sum, item) => sum + item.importe, 0);

    // (Mantengo tu lógica original que muta el prop para no tocar otros componentes)
    presupuesto.total =
        Number(presupuesto.manoDeObraChapa || 0) +
        Number(presupuesto.manoDeObraPintura || 0) +
        Number(presupuesto.mecanica || 0) +
        Number(presupuesto.electricidad || 0) +
        Number(totalImporte || 0);

    // const handleDownloadPDF = () => {
    //     if (!pdfRef.current) return;

    //     const element = pdfRef.current;

    //     const opt = {
    //         margin: [10, 10, 10, 10], // pt
    //         filename: `Presupuesto_${presupuesto._id}.pdf`,
    //         image: { type: "jpeg", quality: 0.98 },
    //         html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    //         jsPDF: { unit: "pt", format: "legal", orientation: "portrait" },
    //         pagebreak: { mode: ["css", "legacy", "avoid-all"] },
    //     };

    //     html2pdf()
    //         .set(opt)
    //         .from(element)
    //         .toPdf()
    //         .get("pdf")
    //         .then((/*pdf*/) => {
    //             // Opcional: escalar al ancho de la hoja
    //             // const pageWidth = pdf.internal.pageSize.getWidth();
    //             // const pageHeight = pdf.internal.pageSize.getHeight();

    //             // guardamos
    //         })
    //         .save();
    // };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white rounded-lg w-[1300px] max-h-[90vh] overflow-auto border-2 border-black p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ❌ NO va al PDF */}
                <button
                    className="absolute top-2 right-2 text-red-600 hover:text-black"
                    onClick={onClose}
                    title="Cerrar vista previa"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* ✅ SOLO esto se exporta a PDF */}
                <div ref={pdfRef}>
                    {/* Reglas para cortes de página y evitar quiebres feos */}
                    <style>{`
                        table, thead, tbody, tr, td, th { page-break-inside: avoid; break-inside: avoid; }
                        .avoid-break { page-break-inside: avoid; break-inside: avoid; }
                        .html2pdf__page-break { height: 0; page-break-after: always; break-after: page; }
                        @media print { .no-print { display: none !important; } }
                    `}</style>

                    {/* Header con información fija */}
                    <header className="text-center text-black max-w-[1240px] min-w-[1240px] p-2 pb-0 mb-4 border-b-4 border-black avoid-break">
                        <div className="flex flex-nowrap justify-between items-start gap-5 overflow-x-auto">
                            <div className="flex-1 max-h-[250px] w-[400px] border-r-4 border-black pr-8 text-center">
                                <h1 className="font-serif text-3xl m-0 p-0">CLINICA DEL AUTOMOVIL</h1>
                                <h2 className="m-0 p-[2px]">de Cesar Manuel Díaz</h2>
                                <h3 className="m-0 p-[2px]">CHAPA - PINTURA - MECÁNICA</h3>
                                <h3 className="m-0 p-[2px]">NACIONALES e IMPORTADOS</h3>
                                <h3 className="m-0 p-[2px]">TRABAJOS GARANTIZADOS</h3>
                                <div className="flex">
                                    <p className="text-left px-[85px] my-[2px] font-bold">BEHRING 2669</p>
                                    <p className="text-left px-[80px] my-[2px] font-bold">Tel: 1132438651</p>
                                </div>
                                <h3 className="m-0 p-[2px] font-bold">Ciudad Autónoma de Buenos Aires</h3>
                            </div>
                            <div className="flex flex-col justify-between h-[204px] w-[550px] pl-8 text-left">
                                <h2 className="mb-4 ml-5 mt-4 font-bold">DOCUMENTO NO VALIDO COMO FACTURA</h2>
                                <div className="flex items-center gap-2 mb-4 mt-4">
                                    <h2 className="ml-5 font-bold">Presupuesto:</h2>
                                    <input
                                        type="text"
                                        name="presupuesto"
                                        readOnly
                                        className="border-none outline-none w-[250px] text-[20px]"
                                    />
                                </div>
                                <div className="flex items-center gap-2 mt-4 mb-4">
                                    <h2 className="ml-5 font-bold">Fecha:</h2>
                                    <input
                                        id="fecha-presupuesto"
                                        name="fechaPresupuesto"
                                        type="text"
                                        readOnly
                                        value={formatearFecha(presupuesto.fecha)}
                                        className="border-none outline-none w-[250px] text-[20px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Datos cliente, domicilio, póliza, vehículo, patente, siniestro */}
                    <div className="border-b-[3px] max-w-[1240px] min-w-[1240px] border-black avoid-break">
                        <div className="flex m-2 w-full">
                            <div className="text-left mr-5 flex flex-col w-[620px]">
                                <div className="flex items-center mb-3">
                                    <label htmlFor="cliente" className="w-[50px] mr-2">Cliente:</label>
                                    <input
                                        id="cliente"
                                        name="cliente"
                                        type="text"
                                        value={presupuesto.cliente}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="domicilio" className="w-[67px] mr-2">Domicilio:</label>
                                    <input
                                        id="domicilio"
                                        name="domicilio"
                                        type="text"
                                        value={presupuesto.domicilio}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="poliza" className="w-[67px] mr-2">Póliza N°:</label>
                                    <input
                                        id="poliza"
                                        name="poliza"
                                        type="text"
                                        value={presupuesto.poliza}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                            </div>
                            <div className="text-left flex flex-col w-[560px]">
                                <div className="flex items-center mb-3">
                                    <label htmlFor="vehiculo" className="w-[47px] mr-2">Coche:</label>
                                    <input
                                        id="vehiculo"
                                        name="vehiculo"
                                        type="text"
                                        value={presupuesto.vehiculo}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="patente" className="w-[56px] mr-2">Patente:</label>
                                    <input
                                        id="patente"
                                        name="patente"
                                        type="text"
                                        value={presupuesto.patente}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                                <div className="flex items-center mb-3">
                                    <label htmlFor="siniestro" className="w-[87px] mr-2">Siniestro N°:</label>
                                    <input
                                        id="siniestro"
                                        name="siniestro"
                                        type="text"
                                        value={presupuesto.siniestro}
                                        readOnly
                                        className="border-b-2 border-black outline-none text-lg flex-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex m-2 avoid-break">
                        <h3 className="pl-[145px] mt-2 mb-4 font-bold">A: Reponer</h3>
                        <h3 className="pl-[40px] mt-2 mb-4 font-bold">B: Reacondicionar</h3>
                    </div>

                    {/* Aquí separamos las tablas por ubicación */}
                    {ubicaciones.map((ubicacion) => {
                        const itemsUbicacion = presupuesto.items.filter(item => item.ubicacion === ubicacion);
                        if (itemsUbicacion.length === 0) return null;

                        return (
                            <div key={ubicacion} className="tabla mx-auto gap-[2px] w-[1200px] flex flex-col items-center mb-2 avoid-break" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                                <h2 className="font-bold text-2xl self-start">{ubicacion}</h2>
                                <table className="border-collapse border-3 border-black w-full">
                                    <thead>
                                        <tr className="border-[3px] border-black">
                                            <th className="border-[3px] border-black w-[50px]">N°</th>
                                            <th className="border-[3px] border-black w-[500px]">PARTE</th>
                                            <th className="border-[3px] border-black w-[50px]">A</th>
                                            <th className="border-[3px] border-black w-[50px]">B</th>
                                            <th className="border-[3px] border-black w-[350px]">OBS.</th>
                                            <th className="border-[3px] border-black w-[150px]">IMPORTE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsUbicacion.map((item) => (
                                            <tr key={item.id} className="relative h-[30px]">
                                                <td className="border-[3px] border-black w-[50px] text-left"></td>
                                                <td className="border-[3px] border-black w-[500px] text-left">
                                                    {item.descripcion.replace(/\|/g, ' ')}
                                                </td>
                                                <td className="border-[3px] border-black w-[50px] text-center">{item.a}</td>
                                                <td className="border-[3px] border-black w-[50px] text-center">{item.b}</td>
                                                <td className="border-[3px] border-black w-[350px] text-left">{item.observaciones}</td>
                                                <td className="border-[3px] border-black w-[150px] text-right">$ {item.importe.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}

                    {/* Facturación, firmas, observaciones, extras */}
                    <div className="final border-[3px] border-black my-10 max-w-[1200px] min-w-[1200px] mx-auto avoid-break">
                        <div className="facturacion text-left m-8 mb-2">
                            <h3 id="precio-estimado" className="text-center mb-4 font-bold">PRECIO ESTIMADO</h3>
                            {["chapa", "pintura", "mecanica", "electricidad"].map((campo) => {
                                const inputId = `manoObra-${campo}`;
                                return (
                                    <div className="facturacion-row flex justify-between mb-2" key={campo}>
                                        <label htmlFor={inputId}>M.O. {campo.toUpperCase()}</label>
                                        <input
                                            id={inputId}
                                            name={`manoObra-${campo}`}
                                            type="text"
                                            value={`$ ${Number(presupuesto[campo as keyof typeof presupuesto] || 0).toFixed(2)}`}
                                            readOnly
                                            className="border-b-2 border-dotted border-[rgba(22,22,22,0.688)] outline-none w-[980px] ml-[10px] text-[16px]"
                                        />
                                    </div>
                                );
                            })}
                            <div className="facturacion-row flex justify-between mb-2">
                                <label htmlFor="repuestos">REPUESTOS</label>
                                <input
                                    id="repuestos"
                                    name="repuestos"
                                    type="text"
                                    value={`$ ${totalImporte.toFixed(2)}`}
                                    readOnly
                                    className="border-b-2 border-dotted border-[rgba(22,22,22,0.688)] outline-none w-[980px] ml-[10px] text-[16px]"
                                />
                            </div>
                            <div className="facturacion-row font-bold flex justify-between align-items: center w-auto">
                                <label htmlFor="total">TOTAL</label>
                                <input
                                    id="total"
                                    name="total"
                                    type="text"
                                    value={`$ ${presupuesto.total.toFixed(2)}`}
                                    readOnly
                                    className="border-b-2 border-dotted border-[rgba(22,22,22,0.688)] outline-none w-[980px] ml-[10px] text-[16px]"
                                />
                            </div>
                        </div>

                        <div className="firma grid grid-cols-3 text-center mb-6">
                            {["lugar_fecha", "firma_cliente", "firma_responsable"].map((campo, i) => (
                                <div key={campo} className="flex flex-col items-center">
                                    <input
                                        id={campo}
                                        name={campo}
                                        type="text"
                                        value={i === 0 ? `CABA ${formatearFecha(presupuesto.fecha)}` : i === 1 ? ' ' : `${presupuesto.firmaResponsable}`}
                                        readOnly
                                        className={`border-b-2 border-dotted border-black text-center w-[280px] h-[60px] ${i === 0 ? 'pt-5 text-3xl' : i === 1 ? '' : i === 2 ? 'text-6xl ' : ''}`}
                                    />
                                    <label htmlFor={campo} className="mt-3 font-bold">
                                        {i === 0 ? 'Lugar Y Fecha' : i === 1 ? 'Firma del cliente' : 'Firma del responsable'}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="extras grid grid-cols-2 gap-20">
                            <div className="observaciones ml-5 mr-28 mb-4">
                                <label htmlFor="obs">Observaciones:</label>
                                <textarea
                                    id="obs"
                                    name="obs"
                                    value={presupuesto.observaciones || ''}
                                    readOnly
                                    className="w-full h-[100px] text-sm p-2 resize-y border-none leading-[24px]"
                                    style={{
                                        backgroundImage:
                                            'repeating-linear-gradient(to bottom, transparent 0px, transparent 21px, #999 21px, #999 22px)',
                                        backgroundSize: '100% 24px',
                                        backgroundPosition: '0 6px',
                                    }}
                                ></textarea>
                            </div>

                            <div className="lote-a-bordo ml-24 mr-12 mb-1">
                                {["rueda_auxilio", "encendedor", "cricket", "herramientas"].map((campo) => (
                                    <div key={campo} className="lote-row mb-2 flex justify-between items-center w-[90%]">
                                        <label htmlFor={campo}>{`Tiene ${campo.replace(/_/g, ' ')}`}</label>
                                        <input
                                            type="text"
                                            id={campo}
                                            name={campo}
                                            value={String(presupuesto[campo as keyof typeof presupuesto] || '')}
                                            readOnly
                                            className="border-b-2 border-dotted border-black w-[150px] text-base"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ❌ Botones que NO van al PDF */}
                <div className="flex justify-end gap-4 max-w-[1200px] mx-auto mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-gray-500 rounded px-4 py-2"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onSave();
                            //handleDownloadPDF();
                        }}
                        className="bg-green-600 text-white rounded px-4 py-2"
                    >
                        Guardar Presupuesto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VistaPrevia;
