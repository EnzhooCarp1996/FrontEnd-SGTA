import React, { useState, useEffect } from 'react';
import { SelectCascada } from './SelectCascada';

interface Props {
  ubicacion: string;
  onSelect: (descripcion: string) => void;
  valorActual: string;
  descripcionesUsadas: string[];
}

const estructuraPartes: Record<
  string,
  Record<string, Record<string, string[] | null> | null>
> = {
  'PARTE DELANTERA': {
    'Paragolpes': {
      '/centro/punteras': null,
    },
    'Soportes': null,
    'Defensas': null,
    'Uñas': null,
    'Cubrepiedras': null,
    'Panel': {
      'frente': ['sup/inf', 'moldura', 'insig.'],
    },
    'Rejilla': {
      'radiador': [' ', 'marco', 'insig.'],
    },
    'Guardabarros': {
      'derecho': [' ', 'moldura', 'guardapolvo'],
      'izquierdo': [' ', 'moldura', 'guardapolvo'],
    },
    'Faro': {
      'derecho': [' ', 'aro'],
      'izquierdo': [' ', 'aro'],
    },
    'Farito': {
      'derecho': null,
      'izquierdo': null,
    },
    'Capot': {
      ' ': null,
      'cierre': null,
      'bisagras': null,
      'molduras': null,
    },
    'Torpedo': {
      'lado': ['derecho', 'izquierdo'],
    },
    'Parabrisas': {
      'crist./mold./burlete': null,
      'parantes': null,
    },
  },
  'PARTE TRASERA': {
    'Paragolpes': {
      '/centro/punteras': null,
    },
    'Soportes': null,
    'Defensas': null,
    'Uñas': null,
    'Cubrepiedras': null,
    'Panel': null,
    'Tapa baúl/motor/portón': null,
    'Piso baúl': null,
    'Bisagras baúl': null,
    'Luneta': {
      'trasera': null,
      'cristal/mold/burlete': null,
    },

    'Guardabarros': {
      'derecho': [' ', 'moldura', 'guardapolvo'],
      'izquierdo': [' ', 'moldura', 'guardapolvo'],
    },
  },
  'INTERIOR': {
    'Instrumental': null,
    'Tablero de instrumental': null,
    'Tapizado': {
      'asiento': ['delantero', 'trasero'],
      'puertas': ['delantera derecha', 'delantera izquierda', 'trasera derecha', 'trasera izquierda'],
    },
    'Marcos': null,
    'Tapizado techo': null,
    'Alfombras': null,
    'Guias asientos': {
      'delantero': null,
      'izquierdo': null,
    },
    'Espejo retrovisor': null,
    'Bandeja': null,
    'Piso lado': {
      'derecho': null,
      'izquierdo': null,
    },
    'Brazo limp parab.': null,
    'Cepillo limp parab.': null,
    'Motor limpia parab': null,
    'Estructura de asiento': null,
    'Piso de baúl': null,
    'Instalacion eléctrica': null,
    'Bocina': null,
  },
  'LADO DERECHO': {
    'Puerta': {
      'delantera': [' ', 'cristal', 'moldura', 'bisagras', 'manijas'],
      'trasera': [' ', 'cristal', 'moldura', 'bisagras', 'manijas'],
    },
    'Panel': null,
    'Parante': {
      'delantero': null,
      'centro': null,
      'trasero': null,
    },
    'Zocalo': {
      ' ': null,
      'moldura': null,
    },
    'Cristales de panel': null,
  },
  'LADO IZQUIERDO': {
    'Puerta': {
      'delantera': [' ', 'cristal', 'moldura', 'bisagras', 'manijas'],
      'trasera': [' ', 'cristal', 'moldura', 'bisagras', 'manijas'],
    },
    'Panel': null,
    'Parante': {
      'delantero': null,
      'centro': null,
      'trasero': null,
    },
    'Zocalo': {
      ' ': null,
      'moldura': null,
    },
    'Cristales de panel': null,
  },
  'MOTOR': {
    'Block': null,
    'Soportes': null,
    'Indicador/panel': null,
    'Ventilador': null,
    'Bomba': {
      'de agua': null,
      'de nafta': null,
    },
    'Dinamo': null,
    'Carburador': null,
    'Distribuidor': null,
    'Bobina': null,
    'Batería': {
      ' ': null,
      'cajón': null,
    },
    'Caños de goma': null,
    'Motor de arranque': null,
    'Tanque de nafta': null,
    'Caño de escape': null,
    'Instalación eléctrica': null,
  },
  'CHASIS': {
    'Larguero': {
      'derecho': null,
      'izquierdo': null,
    },
    'Travesaño': {
      'delantero': null,
      'izquierdo': null,
    },
    'Falso chasis': null,
  },
  'TREN TRASERO': {
    'Espirales': null,
    'Barras de torsión': null,
    'Amortiguador': {
      'derecho': null,
      'izquierdo': null,
    },
    'Elastico': {
      'derecho': null,
      'izquierdo': null,
    },
    'Rueda': {
      'derecha': ['', 'taza'],
      'izquierda': ['', 'taza'],
    },
    'Brazo oscilante': null,
    'Barra estabilizadora': null,
    'Plato': null,
  },
  'TREN DELANTERO': {
    'Alineacion direccion': null,
    'Eje': null,
    'Espirales': null,
    'Brazos': null,
    'Amortiguador': {
      'derecho': null,
      'izquierdo': null,
    },
    'Punta de eje': null,
    'Elastico': {
      'derecho': null,
      'izquierdo': null,
      'transversal': null,
    },
    'Brazo oscilante': null,
    'Barra estabilizadora': null,
    'Rueda': {
      'derecha': ['', 'trasera'],
      'izquierda': ['', 'trasera'],
    },
    'Plato': null,
    'Campana': null,
    'Travesaño_de_suspension': null,
    'Parrilla': {
      'inferior': null,
      'superior': null,
    },
    'Puerta-trasera-bisagras': null,
  },
  'TRANSMISION': {
    'Embrague': null,
    'Caja de velocidad': null,
    'Varillaje': null,
    'Cardán ': null,
    'Crucetas': null,
    'Diferencial': null,
    'Mangas de diferencial': null,
    'Pallers': null,
    'Rulemán': null,
    'Piñón/corona': null,
  },
  'DIRECCION': {
    'Volante': null,
    'Aro de volante': null,
    'Tubo': null,
    'Carcasa de tubo': null,
    'Barras': null,
    'Carcaza de caja de dirección': null,
    'Extremo': {
      'izquierdo': null,
      'derecho': null,
    },
    'Brazo Pitman': null,
  }
};

export const DropdownCascada: React.FC<Props> = ({
  ubicacion,
  onSelect,
  valorActual,
  descripcionesUsadas: descripcionUsadas,
}) => {
  const partes = estructuraPartes[ubicacion] || {};

  const [parte1, setParte1] = useState('');
  const [parte2, setParte2] = useState('');
  const [parte3, setParte3] = useState('');

  useEffect(() => {
    if (!valorActual) {
      setParte1('');
      setParte2('');
      setParte3('');
      return;
    }
    const partesSplit = valorActual.split(' ');
    setParte1(partesSplit[0] || '');
    setParte2(partesSplit[1] || '');
    setParte3(partesSplit[2] || '');
  }, [valorActual]);

  const descripcionCompleta = (p1: string, p2?: string, p3?: string) =>
    [p1, p2, p3].filter(Boolean).join(' ');

  const estaUsada = (desc: string) =>
    descripcionUsadas.includes(desc) && desc !== valorActual;

  const opcionesParte2 = parte1 && partes[parte1] ? Object.keys(partes[parte1] ?? {}) : [];
  const opcionesParte3 =
    parte1 &&
      parte2 &&
      partes[parte1] &&
      partes[parte1][parte2] &&
      Array.isArray(partes[parte1][parte2])
      ? (partes[parte1][parte2] as string[])
      : [];

  const onChangeParte1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte1(val);
    setParte2('');
    setParte3('');
    if (!partes[val]) {
      onSelect(val);
    }
  };

  const onChangeParte2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte2(val);
    setParte3('');
    if (partes[parte1]?.[val] === null) {
      onSelect(`${parte1} ${val}`);
    }
  };

  const onChangeParte3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setParte3(val);
    onSelect(`${parte1} ${parte2} ${val}`);
  };

  return (
    <div className="flex space-x-2">
      {/* Select parte 1 */}
      <SelectCascada
        value={parte1}
        onChange={onChangeParte1}
        opciones={Object.keys(partes)}
        descripcionCompleta={descripcionCompleta}
        estaUsada={estaUsada}
      />
      {/* Select parte 2 */}
      <SelectCascada
        value={parte2}
        onChange={onChangeParte2}
        opciones={opcionesParte2}
        descripcionCompleta={(p2) => descripcionCompleta(parte1, p2)}
        estaUsada={estaUsada}
        disabled={!parte1}
      />
      {/* Select parte 3 */}
      <SelectCascada
        value={parte3}
        onChange={onChangeParte3}
        opciones={opcionesParte3}
        descripcionCompleta={(p3) => descripcionCompleta(parte1, parte2, p3)}
        estaUsada={estaUsada}
        disabled={!parte2}
      />
    </div>
  );
};
