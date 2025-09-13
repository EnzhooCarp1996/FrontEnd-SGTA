import { Trash2 } from "lucide-react";
import { DropdownCascada } from "./DropdownCascada";

interface PresupuestoItem {
  id: string;
  descripcion: string;
  ubicacion: string;
  a: string;
  b: string;
  observaciones: string;
  importe: number;
}

interface TablaRowProps {
  item: PresupuestoItem;
  items: PresupuestoItem[];
  displayValues: Record<string, string>;
  setDisplayValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  updateItem: (id: string, field: keyof PresupuestoItem, value: string | number, type?: string) => void;
  removeItem: (id: string) => void;
}

export const TablaRow: React.FC<TablaRowProps> = ({
  item, items, displayValues, setDisplayValues, updateItem, removeItem
}) => (
  <tr key={item.id}>
    <td className="border border-gray-600 px-1 py-1 relative overflow-visible z-[100]">
      <DropdownCascada
        ubicacion={item.ubicacion}
        valorActual={item.descripcion}
        onSelect={(descripcionCompleta) => updateItem(item.id, 'descripcion', descripcionCompleta)}
        descripcionesUsadas={items.filter(i => i.id !== item.id).map(i => i.descripcion)}
      />
    </td>
    <td className="border border-gray-600 px-2 py-1 w-[60px]">
      <select
        value={item.a}
        onChange={(e) => updateItem(item.id, 'a', e.target.value)}
        className="w-full border rounded px-1 py-1"
      >
        <option value="">--</option>
        <option value="X">X</option>
      </select>
    </td>
    <td className="border border-gray-600 px-2 py-1 w-[60px]">
      <select
        value={item.b}
        onChange={(e) => updateItem(item.id, 'b', e.target.value)}
        className="w-full border rounded px-1 py-1"
      >
        <option value="">--</option>
        <option value="X">X</option>
      </select>
    </td>
    <td className="border border-gray-600 px-2 py-1">
      <input
        type="text"
        value={item.observaciones}
        onChange={(e) => updateItem(item.id, 'observaciones', e.target.value)}
        className="w-full border rounded px-1 py-1"
      />
    </td>
    <td className="border border-gray-600 px-2 py-1  w-[100px]">
      <input
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
        className="w-full border rounded px-1 py-1"
        step="0.01"
        min="0"
      />
    </td>
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
