import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ubicacionesPartes } from '../../constants/ubicacionesPresupuesto';
import { formatearFecha } from '../../helpers/utilsPresupuestos';
import { NewPresupuesto } from '../../types';

// Estilos que replican EXACTAMENTE tu diseño Tailwind original
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
        fontFamily: 'Helvetica',
        maxWidth: 500,
        minWidth: 500,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 4,
        borderBottomColor: '#000000',
        paddingBottom: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
    },
    headerLeft: {
        flex: 1,
        maxHeight: 250,
        width: 400,
        borderRightWidth: 4,
        borderRightColor: '#000000',
        paddingRight: 32,
        alignItems: 'center',
    },
    headerRight: {
        flex: 1.5,
        width: 550,
        paddingLeft: 32,
        height: 204,
        justifyContent: 'space-between',
    },
    companyName: {
        fontSize: 24, // text-3xl
        fontWeight: 'bold',
        marginBottom: 0,
        padding: 0,
        fontFamily: 'Helvetica-Bold',
    },
    companySubtitle: {
        fontSize: 12, // text-base
        marginBottom: 2,
        padding: 1,
    },
    companyInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 85,
    },
    companyInfoText: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 20, // ml-5
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12, // mb-3
        gap: 8, // gap-2
    },
    formLabel: {
        fontSize: 14, // text-lg
        fontWeight: 'bold',
        width: 87, // w-[87px]
        marginRight: 8,
    },
    formInput: {
        fontSize: 16, // text-[20px]
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        flex: 1,
        paddingBottom: 2,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18, // text-2xl
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    table: {
        width: 1200,
        borderWidth: 3,
        borderColor: '#000000',
        marginBottom: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: '#000000',
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: '#000000',
        height: 30,
        position: 'relative',
    },
    tableCell: {
        padding: 4,
        fontSize: 10,
        borderRightWidth: 3,
        borderRightColor: '#000000',
    },
    tableCellLast: {
        padding: 4,
        fontSize: 10,
    },
    cellNumber: {
        width: '7%', // w-[50px]
        textAlign: 'left',
    },
    cellParte: {
        width: '42%', // w-[500px]
        textAlign: 'left',
    },
    cellAB: {
        width: '7%', // w-[50px]
        textAlign: 'center',
    },
    cellObs: {
        width: '29%', // w-[350px]
        textAlign: 'left',
    },
    cellImporte: {
        width: '15%', // w-[150px]
        textAlign: 'right',
    },
    footer: {
        borderWidth: 3,
        borderColor: '#000000',
        marginTop: 40, // my-10
        marginBottom: 40,
        maxWidth: 1200,
        minWidth: 1200,
        padding: 32, // m-8
    },
    facturacionSection: {
        marginBottom: 8, // mb-2
    },
    precioEstimado: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16, // mb-4
    },
    facturacionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8, // mb-2
    },
    facturacionLabel: {
        fontSize: 12,
    },
    facturacionValue: {
        fontSize: 12,
        borderBottomWidth: 2,
        borderBottomStyle: 'dotted',
        borderBottomColor: 'rgba(22,22,22,0.688)',
        width: '80%', // w-[980px]
        marginLeft: 10, // ml-[10px]
        textAlign: 'left',
        paddingBottom: 2,
    },
    totalRow: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    firmas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24, // mb-6
    },
    firmaBox: {
        alignItems: 'center',
        width: '30%',
    },
    firmaInput: {
        borderBottomWidth: 2,
        borderBottomStyle: 'dotted',
        borderBottomColor: '#000000',
        width: 280, // w-[280px]
        height: 60, // h-[60px]
        marginBottom: 8, // mb-2
        justifyContent: 'center',
        alignItems: 'center',
    },
    firmaLugarFecha: {
        fontSize: 20, // text-3xl
        paddingTop: 20, // pt-5
    },
    firmaResponsable: {
        fontSize: 48, // text-6xl
    },
    firmaLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 12, // mt-3
    },
    extras: {
        flexDirection: 'row',
        gap: 80, // gap-20
    },
    observaciones: {
        flex: 1,
        marginLeft: 20, // ml-5
        marginRight: 112, // mr-28
        marginBottom: 16, // mb-4
    },
    lote: {
        flex: 1,
        marginLeft: 96, // ml-24
        marginRight: 48, // mr-12
        marginBottom: 4, // mb-1
    },
    loteRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8, // mb-2
        width: '90%',
    },
    loteLabel: {
        fontSize: 12,
    },
    loteValue: {
        fontSize: 14, // text-base
        borderBottomWidth: 2,
        borderBottomStyle: 'dotted',
        borderBottomColor: '#000000',
        width: 150, // w-[150px]
        textAlign: 'left',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#000000',
        height: 100, // h-[100px]
        padding: 8,
        fontSize: 10, // text-sm
        lineHeight: 1.4,
    },
    leyendaAB: {
        flexDirection: 'row',
        marginBottom: 16, // mb-4
        marginTop: 8, // mt-2
        paddingLeft: 145, // pl-[145px]
    },
    leyendaText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 40, // espacio entre A y B
    },
});

interface PresupuestoPDFProps {
    presupuesto: NewPresupuesto;
}

const PresupuestoPDF: React.FC<PresupuestoPDFProps> = ({ presupuesto }) => {
    const totalImporte = presupuesto.items.reduce((sum, item) => sum + item.importe, 0);
    const total = presupuesto.total || 0;

    return (
        <Document>
            <Page size="LEGAL" orientation="portrait" style={styles.page}>
                {/* Header idéntico al original */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.companyName}>CLINICA DEL AUTOMOVIL</Text>
                        <Text style={styles.companySubtitle}>de Cesar Manuel Díaz</Text>
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
                        <Text style={[styles.documentTitle, { marginTop: 16 }]}>
                            DOCUMENTO NO VALIDO COMO FACTURA
                        </Text>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Presupuesto:</Text>
                            <View style={[styles.formInput, { width: 250 }]} />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Fecha:</Text>
                            <Text style={[styles.formInput, { width: 250 }]}>
                                {formatearFecha(presupuesto.fecha)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Datos Cliente y Vehículo - Réplica exacta */}
                <View style={[styles.section, { borderBottomWidth: 3, borderBottomColor: '#000000', maxWidth: 1240, minWidth: 1240 }]}>
                    <View style={{ flexDirection: 'row', margin: 8, width: '100%' }}>
                        <View style={{ flex: 1, marginRight: 20 }}>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 50 }]}>Cliente:</Text>
                                <Text style={styles.formInput}>{presupuesto.cliente}</Text>
                            </View>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 67 }]}>Domicilio:</Text>
                                <Text style={styles.formInput}>{presupuesto.domicilio}</Text>
                            </View>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 67 }]}>Póliza N°:</Text>
                                <Text style={styles.formInput}>{presupuesto.poliza}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 47 }]}>Coche:</Text>
                                <Text style={styles.formInput}>{presupuesto.vehiculo}</Text>
                            </View>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 56 }]}>Patente:</Text>
                                <Text style={styles.formInput}>{presupuesto.patente}</Text>
                            </View>
                            <View style={styles.formRow}>
                                <Text style={[styles.formLabel, { width: 87 }]}>Siniestro N°:</Text>
                                <Text style={styles.formInput}>{presupuesto.siniestro}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Leyenda A/B */}
                <View style={styles.leyendaAB}>
                    <Text style={styles.leyendaText}>A: Reponer</Text>
                    <Text style={styles.leyendaText}>B: Reacondicionar</Text>
                </View>

                {/* Tablas por ubicación - Mismo formato que el original */}
                {ubicacionesPartes.map((ubicacion) => {
                    const itemsUbicacion = presupuesto.items.filter(item => item.ubicacion === ubicacion);
                    if (itemsUbicacion.length === 0) return null;

                    return (
                        <View key={ubicacion} style={[styles.section, { width: 1200, gap: 2 }]}>
                            <Text style={styles.sectionTitle}>{ubicacion}</Text>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <Text style={[styles.tableCell, styles.cellNumber]}>N°</Text>
                                    <Text style={[styles.tableCell, styles.cellParte]}>PARTE</Text>
                                    <Text style={[styles.tableCell, styles.cellAB]}>A</Text>
                                    <Text style={[styles.tableCell, styles.cellAB]}>B</Text>
                                    <Text style={[styles.tableCell, styles.cellObs]}>OBS.</Text>
                                    <Text style={[styles.tableCellLast, styles.cellImporte]}>IMPORTE</Text>
                                </View>
                                {itemsUbicacion.map((item) => (
                                    <View key={item.id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.cellNumber]}></Text>
                                        <Text style={[styles.tableCell, styles.cellParte]}>
                                            {item.descripcion.replace(/\|/g, ' ')}
                                        </Text>
                                        <Text style={[styles.tableCell, styles.cellAB]}>{item.a}</Text>
                                        <Text style={[styles.tableCell, styles.cellAB]}>{item.b}</Text>
                                        <Text style={[styles.tableCell, styles.cellObs]}>{item.observaciones}</Text>
                                        <Text style={[styles.tableCellLast, styles.cellImporte]}>
                                            $ {item.importe.toFixed(2)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}

                {/* Footer con facturación, firmas y extras - Idéntico al original */}
                <View style={styles.footer}>
                    {/* Facturación */}
                    <View style={styles.facturacionSection}>
                        <Text style={styles.precioEstimado}>PRECIO ESTIMADO</Text>

                        {[
                            { label: 'M.O. CHAPA', value: presupuesto.manoDeObraChapa },
                            { label: 'M.O. PINTURA', value: presupuesto.manoDeObraPintura },
                            { label: 'M.O. MECANICA', value: presupuesto.mecanica },
                            { label: 'M.O. ELECTRICIDAD', value: presupuesto.electricidad },
                            { label: 'REPUESTOS', value: totalImporte },
                        ].map((item, index) => (
                            <View key={index} style={styles.facturacionRow}>
                                <Text style={styles.facturacionLabel}>{item.label}</Text>
                                <Text style={styles.facturacionValue}>
                                    $ {Number(item.value || 0).toFixed(2)}
                                </Text>
                            </View>
                        ))}

                        <View style={styles.facturacionRow}>
                            <Text style={[styles.facturacionLabel, styles.totalRow]}>TOTAL</Text>
                            <Text style={[styles.facturacionValue, styles.totalRow]}>
                                $ {total.toFixed(2)}
                            </Text>
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
                            <Text style={styles.facturacionLabel}>Observaciones:</Text>
                            <View style={styles.textArea}>
                                <Text>{presupuesto.observaciones || ''}</Text>
                            </View>
                        </View>
                        <View style={styles.lote}>
                            {[
                                { key: 'ruedaAuxilio', label: 'rueda auxilio' },
                                { key: 'encendedor', label: 'encendedor' },
                                { key: 'cricket', label: 'cricket' },
                                { key: 'herramientas', label: 'herramientas' },
                            ].map((item) => (
                                <View key={item.key} style={styles.loteRow}>
                                    <Text style={styles.loteLabel}>Tiene {item.label}</Text>
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

export default PresupuestoPDF;