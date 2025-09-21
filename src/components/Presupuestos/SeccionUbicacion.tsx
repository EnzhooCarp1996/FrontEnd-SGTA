import { PresupuestoItem } from "../../types";
import { TablaRow } from "./TablaRow";

interface Props {
  ubicacion: string;
  items: PresupuestoItem[];
  addItem: (ubicacion: string) => void;
  updateItem: (id: number, field: keyof PresupuestoItem, value: string | number, type?: string) => void;
  removeItem: (id: number) => void;
}

export const SeccionUbicacion: React.FC<Props> = ({ ubicacion, items, addItem, updateItem, removeItem }) => {
  const itemsPorUbicacion = items.filter(item => item.ubicacion === ubicacion);

  return (
    <div className="border-none p-0 rounded-md mt-2 mb-6">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-medium">{ubicacion}</h2>
        <button
          type="button"
          onClick={() => addItem(ubicacion)}
          className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded"
        >
          Agregar Parte
        </button>
      </div>

      {itemsPorUbicacion.length > 0 && (
        <table className="w-full text-sm border-collapse border border-gray-950">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-600 px-2 py-1">Parte</th>
              <th className="border border-gray-600 px-2 py-1">A</th>
              <th className="border border-gray-600 px-2 py-1">B</th>
              <th className="border border-gray-600 px-2 py-1">Observaciones</th>
              <th className="border border-gray-600 px-2 py-1">Importe($)</th>
              <th className="border border-gray-600 px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {itemsPorUbicacion.map((item) => (
              <TablaRow
                key={item.id}
                item={item}
                items={itemsPorUbicacion}
                displayValues={{}}
                setDisplayValues={() => {}}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
