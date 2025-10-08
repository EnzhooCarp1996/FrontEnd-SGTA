import { EstructuraPartes } from "../../../types/PartesVehiculo";
import { MenuDesplegable } from "./MenuDesplegable";
import { PresupuestoItem } from "../../../types";
import { SelectCell } from "./SelectCell";
import { InputCell } from "./InputCell";
import { Trash2 } from "lucide-react";

interface TablaRegistrosProps {
  rowId: number;
  item: PresupuestoItem;
  items: PresupuestoItem[];
  estructuraPartes: EstructuraPartes;
  displayValues: Record<string, string>;
  setDisplayValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  updateItem: (id: number, field: keyof PresupuestoItem, value: string | number, type?: string) => void;
  removeItem: (id: number) => void;
}

export const TablaRegistros: React.FC<TablaRegistrosProps> = ({
  rowId, item, items, estructuraPartes, displayValues, setDisplayValues, updateItem, removeItem
}) => (
  <tr>
    {/* Columna descripción */}
    <MenuDesplegable
      id={`descripcion-${rowId}`}
      name={`descripcion-${rowId}`}
      ubicacion={item.ubicacion}
      valorActual={item.descripcion}
      estructuraPartes={estructuraPartes}
      onSelect={(desc) => updateItem(item.id, 'descripcion', desc)}
      descripcionUsadas={items.filter(i => i.id !== item.id).map(i => i.descripcion)}
    />

    {/* Select A y B */}
    <SelectCell
      id={`a-${rowId}`}
      name={`a-${rowId}`}
      value={item.a}
      onChange={(e) => updateItem(item.id, 'a', e.target.value)}
    />
    <SelectCell
      id={`b-${rowId}`}
      name={`b-${rowId}`}
      value={item.b}
      onChange={(e) => updateItem(item.id, 'b', e.target.value)}
    />

    {/* Observaciones */}
    <InputCell
      id={`observaciones-${rowId}`}
      name={`observaciones-${rowId}`}
      value={item.observaciones}
      onChange={(e) => updateItem(item.id, 'observaciones', e.target.value)}
    />

    {/* Importe */}
    <InputCell
      id={`importe-${rowId}`}
      name={`importe-${rowId}`}
      type="number"
      value={displayValues[item.id] ?? item.importe.toString()}
      onChange={(e) => {
        const val = e.target.value;
        setDisplayValues((prev) => ({ ...prev, [item.id]: val }));
        updateItem(item.id, 'importe', val, e.target.type);
      }}
      onBlur={() => {
        if (displayValues[item.id] === '') {
          updateItem(item.id, 'importe', '0', 'number');
          setDisplayValues((prev) => ({ ...prev, [item.id]: '0' }));
        }
      }}
      step="0.01"
      min="0"
    />

    {/* Eliminar */}
    <td className="border border-gray-600 px-1 py-1 text-center w-[5px]">
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="text-red-600 hover:text-red-800"
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4 inline" />
      </button>
    </td>
  </tr>
);

