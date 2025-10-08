interface VistaPreviaHeaderProps {
  fecha: string;
}

export const VistaPreviaHeader: React.FC<VistaPreviaHeaderProps> = ({ fecha }) => {
  const formatearFecha = (iso: string) => {
    const [año, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${año}`;
  };

  return (
    <header className="text-center text-black max-w-[1240px] min-w-[1240px] p-2 pb-0 mb-4 border-b-4 border-black avoid-break">
      <div className="flex flex-nowrap justify-between items-start gap-5 overflow-x-auto">
        <div className="flex-1 max-h-[250px] w-[400px] border-r-4 border-black pr-8 text-center">
          <h1 className="font-serif text-3xl">CLINICA DEL AUTOMOVIL</h1>
          <h2>de Cesar Manuel Díaz</h2>
          <h3>CHAPA - PINTURA - MECÁNICA</h3>
          <h3>NACIONALES e IMPORTADOS</h3>
          <h3>TRABAJOS GARANTIZADOS</h3>
          <div className="flex">
            <p className="text-left px-[85px] my-[2px] font-bold">BEHRING 2669</p>
            <p className="text-left px-[80px] my-[2px] font-bold">Tel: 1132438651</p>
          </div>
          <h3 className="font-bold">Ciudad Autónoma de Buenos Aires</h3>
        </div>
        <div className="flex flex-col justify-between h-[204px] w-[550px] pl-8 text-left">
          <h2 className="mb-4 ml-5 mt-4 font-bold">DOCUMENTO NO VALIDO COMO FACTURA</h2>
          <div className="flex items-center gap-2 mb-4 mt-4">
            <h2 className="ml-5 font-bold">Presupuesto:</h2>
            <input type="text" readOnly className="border-none outline-none w-[250px] text-[20px]" />
          </div>
          <div className="flex items-center gap-2 mt-4 mb-4">
            <h2 className="ml-5 font-bold">Fecha:</h2>
            <input
              type="text"
              readOnly
              value={formatearFecha(fecha)}
              className="border-none outline-none w-[250px] text-[20px]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
