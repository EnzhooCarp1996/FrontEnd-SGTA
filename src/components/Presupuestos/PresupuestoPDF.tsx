import { formatearFecha, formatearImporte, ubicacionesPartes } from '../../helpers/utilsPresupuestos';
import { usePresupuestoPDF } from '../../hooks/Presupuestos/usePresupuestoPDF';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../Styles/PresupuestoPDFStyles';
import { NewPresupuesto } from '../../types';

interface PresupuestoPDFProps {
    presupuesto: NewPresupuesto;
}

export const PresupuestoPDF: React.FC<PresupuestoPDFProps> = ({ presupuesto }) => {
    const { totalImporte, total, lineas } = usePresupuestoPDF(presupuesto);

    return (
        <Document>
            <Page size="LEGAL" orientation="portrait" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.companyName}>CLINICA DEL AUTOMOVIL</Text>
                        <Text style={styles.companyPrimerSubtitle}>de Cesar Manuel Díaz</Text>
                        <Text style={styles.companySubtitle}>CHAPA - PINTURA - MECÁNICA</Text>
                        <Text style={styles.companySubtitle}>NACIONALES e IMPORTADOS</Text>
                        <Text style={styles.companySubtitle}>TRABAJOS GARANTIZADOS</Text>
                        <View style={styles.companyInfoRow}>
                            <Text style={styles.companyInfoText}>BEHRING 2669</Text>
                            <Text style={styles.companyInfoText}>Tel: 1132438651</Text>
                        </View>
                        <Text style={[styles.companySubtitle, { fontWeight: 'bold' }]}>
                            Ciudad Autónoma de Buenos Aires
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={[styles.documentTitle]}>
                            DOCUMENTO NO VÁLIDO COMO FACTURA
                        </Text>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Presupuesto:</Text>
                            <View style={[styles.formInput]} />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Fecha:</Text>
                            <Text style={[styles.formInput]}>
                                {formatearFecha(presupuesto.fecha)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Datos Cliente y Vehículo*/}
                <View style={styles.sectionDatos}>
                    <View style={styles.flexDatos}>
                        <View style={styles.datosCliente}>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 35 }]}>Cliente:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.cliente}</Text>
                            </View>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 35 }]}>Domicilio:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.domicilio}</Text>
                            </View>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 35 }]}>Póliza N°:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.poliza}</Text>
                            </View>
                        </View>
                        <View style={styles.datosCliente}>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 44 }]}>Coche:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.vehiculo}</Text>
                            </View>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 44 }]}>Patente:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.patente}</Text>
                            </View>
                            <View style={styles.formField}>
                                <Text style={[styles.formLabelDatos, { width: 44 }]}>Siniestro N°:</Text>
                                <Text style={styles.formInputDatos}>{presupuesto.siniestro}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Leyenda A/B */}
                <View style={styles.leyendaAB}>
                    <Text style={styles.leyendaText}>A: Reponer</Text>
                    <Text style={styles.leyendaText}>B: Reacondicionar</Text>
                </View>

                {/* Tablas por ubicación */}
                {ubicacionesPartes.map((ubicacion) => {
                    const itemsUbicacion = presupuesto.items.filter(item => item.ubicacion === ubicacion);
                    if (itemsUbicacion.length === 0) return null;

                    return (
                        <View key={ubicacion} style={styles.sectionTable}>
                            <View style={styles.sectionTitle}>
                                <Text>{ubicacion}</Text>
                            </View>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <View style={[styles.tableCellHeader, styles.cellNumber]}>
                                        <Text>N°</Text>
                                    </View>
                                    <View style={[styles.tableCellHeader, styles.cellParte]}>
                                        <Text>PARTE</Text>
                                    </View>
                                    <View style={[styles.tableCellHeader, styles.cellAB]}>
                                        <Text>A</Text>
                                    </View>
                                    <View style={[styles.tableCellHeader, styles.cellAB]}>
                                        <Text>B</Text>
                                    </View>
                                    <View style={[styles.tableCellHeader, styles.cellObs]}>
                                        <Text>OBS.</Text>
                                    </View>
                                    <View style={[styles.tableCellHeader, styles.cellImporte]}>
                                        <Text>IMPORTE</Text>
                                    </View>
                                </View>

                                {itemsUbicacion.map((item, index) => (
                                    <View key={item.id} style={styles.tableRow}>
                                        <View style={[styles.tableCell, styles.cellNumber]}>
                                            <Text>{index + 1}</Text>
                                        </View>
                                        <View style={[styles.tableCell, styles.cellParte]}>
                                            <Text>{item.descripcion.replace(/\|/g, ' ')}</Text>
                                        </View>
                                        <View style={[styles.tableCell, styles.cellAB]}>
                                            <Text>{item.a}</Text>
                                        </View>
                                        <View style={[styles.tableCell, styles.cellAB]}>
                                            <Text>{item.b}</Text>
                                        </View>
                                        <View style={[styles.tableCell, styles.cellObs]}>
                                            <Text>{item.observaciones}</Text>
                                        </View>
                                        <View style={[styles.cellImporte, styles.cellImporteNumber]}>
                                            <Text style={styles.signoPeso}>$</Text>
                                            <Text style={styles.importeTexto}>
                                                {formatearImporte(item.importe)}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}

                {/* Footer con facturación, firmas y extras */}
                <View style={styles.footer}>
                    {/* Facturación */}
                    <View style={styles.facturacionSection}>
                        <Text style={styles.precioEstimado}>PRECIO ESTIMADO</Text>

                        {[
                            { label: 'M.O. CHAPA', value: presupuesto.manoDeObraChapa },
                            { label: 'M.O. PINTURA', value: presupuesto.manoDeObraPintura },
                            { label: 'M.O. MECÁNICA', value: presupuesto.mecanica },
                            { label: 'M.O. ELECt. Y TAP', value: presupuesto.electricidad },
                            { label: 'REPUESTOS', value: totalImporte },
                        ].map((item, index) => (
                            <View key={index} style={styles.facturacionRow}>
                                <View style={styles.facturacionLabel}>
                                    <Text>{item.label}</Text>
                                </View>
                                <View style={styles.facturacionValue}>
                                    <Text style={[styles.facturacionSignoPeso, { marginRight: 2 }]}>$</Text>
                                    <View style={styles.importeContainer}>
                                        <Text style={styles.facturacionImporte}>{formatearImporte(item.value)}</Text>
                                    </View>
                                </View>

                            </View>
                        ))}

                        <View style={styles.facturacionRow}>
                            <Text style={[styles.facturacionLabel, { fontWeight: "bold" }]}>TOTAL</Text>
                            <View style={[styles.facturacionValue, { fontWeight: "bold" }]}>
                                <Text style={[styles.facturacionSignoPeso, { marginRight: 2 }]}>$</Text>
                                <Text style={styles.facturacionImporte}>{formatearImporte(total)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Firmas */}
                    <View style={styles.firmas}>
                        {[
                            {
                                value: `CABA ${formatearFecha(presupuesto.fecha)}`,
                                label: 'Lugar Y Fecha',
                                style: styles.firmaLugarFecha
                            },
                            {
                                value: ' ',
                                label: 'Firma del cliente'
                            },
                            {
                                value: presupuesto.firmaResponsable,
                                label: 'Firma del responsable',
                                style: styles.firmaResponsable
                            },
                        ].map((firma, index) => (
                            <View key={index} style={styles.firmaBox}>
                                <View style={styles.firmaInput}>
                                    <Text style={firma.style}>{firma.value}</Text>
                                </View>
                                <Text style={styles.firmaLabel}>{firma.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Extras */}
                    <View style={styles.extras}>
                        <View style={styles.observaciones}>
                            {/* Primera línea con etiqueta */}
                            <Text style={styles.observacionesLabel}>Observaciones:</Text>

                            {/* Resto de líneas punteadas */}
                            {Array.from({ length: 4 }).map((_, i) => (
                                <View key={i} style={styles.observacionLinea}>
                                    <Text style={styles.observacionTexto}>
                                        {lineas[i] || ''}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.lote}>
                            {[
                                { key: 'ruedaAuxilio', label: 'Tiene rueda de auxilio' },
                                { key: 'encendedor', label: 'encendedor' },
                                { key: 'cricket', label: 'cricket' },
                                { key: 'herramientas', label: 'herramientas' },
                            ].map((item) => (
                                <View key={item.key} style={styles.loteRow}>
                                    <Text style={styles.loteLabel}>{item.label}</Text>
                                    <Text style={styles.loteValue}>
                                        {String(presupuesto[item.key as keyof NewPresupuesto] || '')}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

