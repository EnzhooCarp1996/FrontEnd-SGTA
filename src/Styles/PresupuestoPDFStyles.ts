import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 0,
    fontFamily: "Helvetica",
    width: 500,
  },
  //-----------------------Header---------------------------------
  header: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#000000",
    paddingBottom: 0,
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
    height: 90,
    width: 120,
    borderRightWidth: 1.5,
    borderRightColor: "#000000",
    paddingRight: 20,
    paddingLeft: 50,
    alignItems: "center",
  },
  headerRight: {
    flex: 1.5,
    width: 80,
    height: 90,
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 0,
    padding: 0,
    paddingTop: 7,
    fontFamily: "Helvetica-Bold",
  },
  companyPrimerSubtitle: {
    fontSize: 10,
    marginBottom: 3,
    padding: 1,
  },
  companySubtitle: {
    fontSize: 7,
    marginBottom: 1,
    padding: 0,
  },
  companyInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 6,
  },
  companyInfoText: {
    fontSize: 7,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 3,
  },
  documentTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 30,
    marginTop: 16,
  },
  formRow: {
    fontSize: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 6,
  },
  formLabel: {
    fontWeight: "bold",
    marginRight: 4,
    marginLeft: 30,
  },
  formInput: {
    borderBottomColor: "#000000",
    flex: 1,
  },
  //-----------------------Datos Cliente y Vehículo---------------------------------
  sectionDatos: {
    marginBottom: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000000",
    width: 570,
  },
  flexDatos: {
    flexDirection: "row",
    margin: 1,
    width: "100%",
  },
  datosCliente: {
    flex: 1,
    marginRight: 5,
    marginBottom: 3,
  },
  formField: {
    fontSize: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 6,
  },
  formLabelDatos: {
    marginRight: 0,
    marginLeft: 2,
  },
  formInputDatos: {
    borderBottomColor: "#000000",
    flex: 1,
    borderBottomWidth: 1,
  },
  //-----------------------Leyenda A/B---------------------------------
  leyendaAB: {
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 2,
    paddingLeft: 220,
  },
  leyendaText: {
    fontSize: 8,
    fontWeight: "bold",
    marginRight: 30,
  },
  //-----------------------Tabla por ubicacion---------------------------------
  sectionTable: {
    marginBottom: 3,
    width: 570,
    gap: 2,
    alignItems: "center",
  },
  sectionTitle: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 0,
    paddingLeft: 10,
    paddingBottom: 0,
  },
  //-----------------------Tabla-----------------------------------------------
  table: {
    width: 550,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 0.1,
    borderBottomWidth: 0,
    padding: 0,
  },
  tableHeader: {
    flexDirection: "row",
    height: 16,
    fontSize: 8,
    textAlign: "center",
    borderBottomWidth: 0,
  },
  tableCellHeader: {
    margin: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    height: 12,
    fontSize: 8,
    textAlign: "center",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tableCell: {
    margin: 0,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cellNumber: {
    display: "flex",
    width: "7%",
    margin: 0,
  },
  cellParte: {
    width: "36%",
    marginLeft: 0,
    borderLeft: 0,
  },
  cellAB: {
    width: "6%",
    marginLeft: 0,
    borderLeft: 0,
  },
  cellObs: {
    width: "36%",
    marginLeft: 0,
    borderLeft: 0,
  },
  cellImporte: {
    width: "15%",
    marginLeft: 0,
    borderLeft: 0,
  },
  cellImporteNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    fontSize: 8,
  },
  signoPeso: {
    textAlign: "left",
  },
  importeTexto: {
    textAlign: "right",
  },
  //-----------------------Footer---------------------------------
  footer: {
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 10,
    marginBottom: 10,
    width: 570,
    padding: 12,
  },
  //-----------------------Facturacion---------------------------------
  facturacionSection: {
    marginBottom: 4,
  },
  precioEstimado: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
    margin: 6,
  },
  facturacionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 3,
  },
  facturacionLabel: {
    fontSize: 8,
    width: 70,
  },
  facturacionValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 8,
    borderBottomWidth: 0.5,
    borderBottomStyle: "dotted",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    width: 465,
    marginLeft: 4,
    textAlign: "left",
    paddingBottom: 2,
  },
  importeContainer: {
    flex: 1,
    alignItems: "flex-end",
    width: 45,
  },
  facturacionSignoPeso: {
    textAlign: "left",
    paddingRight: 100,
  },
  facturacionImporte: {
    textAlign: "right",
  },
  //-----------------------Firmas---------------------------------
  firmas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  firmaBox: {
    alignItems: "center",
    width: "40%",
  },
  firmaInput: {
    borderBottomWidth: 0.5,
    borderBottomStyle: "dotted",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    width: 160,
    height: 40,
    marginBottom: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  firmaLugarFecha: {
    fontSize: 15,
    paddingTop: 10,
  },
  firmaResponsable: {
    fontSize: 23,
  },
  firmaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    marginTop: 5,
  },
  //-----------------------Extras---------------------------------
  extras: {
    flexDirection: "row",
    gap: 80,
    marginTop: 20,
    marginBottom: 4,
  },
  //-----------------------Observaciones---------------------------------
  observaciones: {
    flexDirection: "column",
  },
  observacionesLabel: {
    fontSize: 8,
    width: 60,
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  observacionLinea: {
    borderBottomWidth: 0.5,
    borderBottomStyle: "dotted",
    borderBottomColor: "#555",
    flex: 1,
    width: 220,
    height: 15,
    justifyContent: "flex-end",
    paddingBottom: 2,
    marginBottom: 0,
  },
  observacionTexto: {
    fontSize: 8,
    lineHeight: 1.4,
    paddingLeft: 2,
    justifyContent: "center",
  },
  //-----------------------Lote de abordo-------------------------
  lote: {
    flex: 1,
    marginLeft: 56,
    marginRight: 48,
  },
  loteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    width: 150,
  },
  loteLabel: {
    fontSize: 8,
    width: 80,
  },
  loteValue: {
    fontSize: 8,
    borderBottomWidth: 0.5,
    borderBottomStyle: "dotted",
    borderBottomColor: "#000000",
    width: 60,
    textAlign: "left",
  },
});
