import { EstructuraPartes } from "../../../types/PartesVehiculo";
import { TablaRegistros } from "./TablaRegistros";
import { PresupuestoItem } from "../../../types";
import { SeccionHeader } from "./SeccionHeader";
import { TablaHeader } from "./TablaHeader";

interface SeccionUbicacionProps {
  ubicacion: string;
  items: PresupuestoItem[];
  estructuraPartes: EstructuraPartes;
  addItem: (ubicacion: string) => void;
  updateItem: (id: number, field: keyof PresupuestoItem, value: string | number, type?: string) => void;
  removeItem: (id: number) => void;
}

export const SeccionUbicacion: React.FC<SeccionUbicacionProps> = ({ ubicacion, items, estructuraPartes, addItem, updateItem, removeItem }) => {
  const itemsPorUbicacion = items.filter(item => item.ubicacion === ubicacion);

  return (
    <div className="border-none p-0 rounded-md mt-2 mb-6">
      <SeccionHeader titulo={ubicacion} onAgregar={() => addItem(ubicacion)} />

      {itemsPorUbicacion.length > 0 && (
        <table className="w-full text-sm border-collapse border border-gray-950">
          <TablaHeader columns={['Parte', 'A', 'B', 'Observaciones', 'Importe($)', '']} />

          <tbody>
            {itemsPorUbicacion.map((item, index) => {
              const rowId = item.id ?? `${ubicacion}-${index}`;
              return (
                <TablaRegistros
                  key={rowId}
                  rowId={rowId}
                  item={item}
                  items={itemsPorUbicacion}
                  estructuraPartes={estructuraPartes}
                  displayValues={{}}
                  setDisplayValues={() => { }}
                  updateItem={updateItem}
                  removeItem={removeItem}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
