import {
  dataItemKepribadian,
  dataItemSikapKerja,
  dataItemSummary,
} from "@/utility/datastatic";
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment-timezone";

const DocumentTestPdfViewer = (props: any) => {
  const {
    data = {},
    summaryCreplin = {},
    summaryIq = 0,
    iqValueRemarks = "",
    dataValueNormaIst = [],
    feedback = {},
    pasFoto= null,
    fotoGrafik = null,
  } = props;
  const styles = StyleSheet.create({
    page: {
      paddingLeft: 22,
      paddingRight: 22,
      lineHeight: 1.3,
      flexDirection: "column",
    },
    numberPage: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 9,
    },
    headContent: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: "#172a64",
    },
    headContentChild: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },
    headContentTitle: {
      fontSize: 16,
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
    },
    headRightContent: {
      flexDirection: "column",
      width: 170,
      borderLeftWidth: 0.5,
      borderColor: "#172a64",
      paddingLeft: 8,
    },
    headRightContentText: {
      fontSize: 9,
      textAlign: "left",
    },
    headLogo: {
      width: 100,
      height: 40,
    },
    checlistIcon: {
      width: 15,
      height: 15,
    },
    grafikImage: {
      width: "100%",
      height: 215,
    },
    pasFoto: {
      width: "100px",
      height: 100,
    },
    pemeriksaanContent: {
      flexDirection: "row",
      backgroundColor: "#172a64",
      color: "white",
      padding: 6,
      justifyContent: "center",
      border: "#172a64",
      borderWidth: 0.5,
    },
    pemeriksaanContentSecond: {
      flexDirection: "row",
      backgroundColor: "#e9f5fb",
      color: "black",
      padding: 3,
      justifyContent: "center",
      border: "#172a64",
      borderWidth: 0.5,
    },
    pemeriksaanContentThird: {
      flexDirection: "row",
      backgroundColor: "white",
      color: "black",
      padding: 3,
      justifyContent: "flex-start",
      border: "#172a64",
      borderWidth: 0.5,
    },
    pemeriksaanContentThirdChild: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 3,
    },
    pemeriksaanContentTitle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    pemeriksaanContentSecondTitle: {
      fontSize: 10,
      fontWeight: "bold",
    },
    summaryContent: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#172a64",
      color: "white",
      padding: 3,
    },
    summaryChildContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#e9f5fb",
      color: "black",
      borderWidth: 0.5,
    },
    summaryChildContentTitle: {
      padding: 4,
      width: 350,
      flexDirection: "row",
      alignItems: "center",
    },
    summaryChildContentRightTitle: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 300,
    },
    summaryChildContentRightBoxTitle: {
      flexDirection: "column",
      alignItems: "center",
      borderLeftWidth: 0.5,
      borderColor: "grey",
      padding: 3,
      width: 100,
    },
    summaryContentItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      color: "black",
      borderWidth: 0.5,
    },
    summaryContentItemTitle: {
      width: 30,
      borderRightWidth: 0.5,
      padding: 6,
      marginLeft: 5,
      marginRight: 5,
    },
    spaceBoxItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      color: "black",
      borderWidth: 0.5,
      height: 15,
    },
    grafikContent: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 6,
      backgroundColor: "white",
      color: "black",
      borderWidth: 0.5,
    },
    grafikContentItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    summaryRekomendasiContent: {
      flexDirection: "column",
      backgroundColor: "#e9f5fb",
      color: "black",
      borderWidth: 0.5,
    },
    summaryRekomendasiContentItem: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 3,
      width: "100%",
    },
    summaryRekomendasiContentItemResult: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 3,
    },
    summaryRekomendasiContentItemResultBox: {
      width: 20,
      height: 20,
      flexDirection: "row",
      borderWidth: 0.5,
      borderColor: "black",
      padding: 3,
    },
    summaryRekomendasiContentTitle: {
      padding: 4,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const logo = "/assets/images/logo-blue-satoria-small.png";
  const checlistIcon = "/assets/images/checklist.png";
  //   const logoUrl = process.env.BASE_URL_SERVER+"/img/biodata/candidate/2024-9/pasfoto-98b0dd4fc887bfbde4665be8ce53d8ca.png";

  const HeadDocument = () => {
    return (
      <>
        <View style={styles.headContent}>
          <View style={styles.headContentChild}>
            <Image style={styles.headLogo} src={logo} />
            <Text style={styles.headContentTitle}>PSYCHOTEST RESUME</Text>
            <View style={styles.headRightContent}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: 50 }}>
                  <Text style={styles.headRightContentText}>Nomor</Text>
                </View>
                <View style={{ width: 5 }}>
                  <Text style={styles.headRightContentText}>:</Text>
                </View>
                <View style={{ width: 100 }}>
                  <Text style={styles.headRightContentText}>FM-HRD-015SG</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: 50 }}>
                  <Text style={styles.headRightContentText}>Tgl Release</Text>
                </View>
                <View style={{ width: 5 }}>
                  <Text style={styles.headRightContentText}>:</Text>
                </View>
                <View style={{ width: 100 }}>
                  <Text style={styles.headRightContentText}>
                    {"1 November 2024"}
                    {/* {moment().locale("id").format("DD MMMM YYYY")} */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <View style={{ width: 50 }}>
                  <Text style={styles.headRightContentText}>Revisi</Text>
                </View>
                <View style={{ width: 5 }}>
                  <Text style={styles.headRightContentText}>:</Text>
                </View>
                <View style={{ width: 100 }}>
                  <Text style={styles.headRightContentText}>0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.spaceBoxItem}></View>
      </>
    );
  };

  const DocumentPemeriksaan = () => {
    return (
      <>
        <View style={styles.pemeriksaanContent}>
          <Text style={styles.pemeriksaanContentTitle}>
            HASIL PEMERIKSAAN PSIKOLOGIS
          </Text>
        </View>
        <View style={styles.pemeriksaanContentSecond}>
          <Text style={styles.pemeriksaanContentSecondTitle}>
            Data Personal
          </Text>
        </View>
        <View style={styles.pemeriksaanContentThird}>
          <View style={styles.pemeriksaanContentThirdChild}>
            <View style={{ flexDirection: "column", width: 150 }}>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>NAMA</Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  JENIS KELAMIN
                </Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  TEMPAT TANGGAL LAHIR
                </Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>USIA</Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  PENDIDIKAN TERAKHIR
                </Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  JABATAN YANG DI LAMAR
                </Text>
              </View>
              <View style={{ width: 150 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  TANGGAL TES
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", width: 10 }}>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>:</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", width: 200 }}>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {data.nama_candidate.toUpperCase()}{" "}
                </Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {data.gender.toUpperCase()}{" "}
                </Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {data.place_born + ","}{" "}
                  {moment(data.date_born).locale("id").format("DD MMMM YYYY")}
                </Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {moment().diff(data.date_born.substring(0, 10), "years")}{" "}
                  Tahun
                </Text>
              </View>
              <View style={{ width: 280 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {data.last_study
                    ? data.last_study_remarks.toUpperCase()
                    : " "}
                </Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {data.nama_job.toUpperCase()}
                </Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.pemeriksaanContentSecondTitle}>
                  {" "}
                  {moment(data.date_applied)
                    .locale("id")
                    .format("DD MMMM YYYY")}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: 170,
                alignItems: "flex-end",
              }}
            >
              {Object.keys(data).length > 0 && pasFoto != null ? (
                <>
                  <Image
                    src={pasFoto}
                    style={{
                      width: 90,
                      height: 120,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  />
                  {/* <Text>{
                    process.env.BASE_URL_SERVER +
                    "/" +
                    data.path_file +
                    "/" +
                    data.pas_foto
                  }</Text> */}
                </>
              ) : (
                <>
                  {/* <Text>tes</Text> */}
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.spaceBoxItem}></View>
      </>
    );
  };

  const DocumentSummaryGridScore = (props: any) => {
    const { item, type = "" } = props;
    return (
      <View style={styles.summaryChildContentRightBoxTitle}>
        {item.toLowerCase() == "kemampuan mengambil keputusan & realistis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan mengambil keputusan & realistis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan mengambil keputusan & realistis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan mengambil keputusan & realistis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan mengambil keputusan & realistis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[0].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "kemampuan bahasa dan empati" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[1].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan bahasa dan empati" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[1].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan bahasa dan empati" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[1].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan bahasa dan empati" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[1].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan bahasa dan empati" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[1].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() ==
          "kemampuan mengkombinasi, analisa masalah dan logis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[2].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() ==
          "kemampuan mengkombinasi, analisa masalah dan logis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[2].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() ==
          "kemampuan mengkombinasi, analisa masalah dan logis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[2].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() ==
          "kemampuan mengkombinasi, analisa masalah dan logis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[2].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() ==
          "kemampuan mengkombinasi, analisa masalah dan logis" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[2].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "kemampuan berhitung" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[3].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan berhitung" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[3].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan berhitung" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[3].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan berhitung" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[3].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kemampuan berhitung" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[3].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[3].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "kelincahan berpikir" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[4].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kelincahan berpikir" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[4].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kelincahan berpikir" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[4].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kelincahan berpikir" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[4].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kelincahan berpikir" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[0].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[4].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "daya ingat dan konsentrasi" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[5].klasifikasi.toLowerCase() == "sangat rendah" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "daya ingat dan konsentrasi" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[5].klasifikasi.toLowerCase() == "rendah" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "daya ingat dan konsentrasi" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[5].klasifikasi.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "daya ingat dan konsentrasi" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[5].klasifikasi.toLowerCase() == "tinggi" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "daya ingat dan konsentrasi" &&
        dataValueNormaIst.length > 0 ? (
          dataValueNormaIst[5].klasifikasi.toLowerCase() == "tinggi sekali" || dataValueNormaIst[5].klasifikasi.toLowerCase() == "sangat tinggi" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "kecepatan kerja" ? (
          summaryCreplin.panker_remarks.toLowerCase() == "kurang sekali" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kecepatan kerja" ? (
          summaryCreplin.panker_remarks.toLowerCase() == "kurang" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kecepatan kerja" ? (
          summaryCreplin.panker_remarks.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kecepatan kerja" ? (
          summaryCreplin.panker_remarks.toLowerCase() == "baik" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "kecepatan kerja" ? (
          summaryCreplin.panker_remarks.toLowerCase() == "baik sekali" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "ketelitian kerja" ? (
          summaryCreplin.tianker_remarks.toLowerCase() == "kurang sekali" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketelitian kerja" ? (
          summaryCreplin.tianker_remarks.toLowerCase() == "kurang" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketelitian kerja" ? (
          summaryCreplin.tianker_remarks.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketelitian kerja" ? (
          summaryCreplin.tianker_remarks.toLowerCase() == "baik" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketelitian kerja" ? (
          summaryCreplin.tianker_remarks.toLowerCase() == "baik sekali" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "keajegan kerja" ? (
          summaryCreplin.janker_remarks.toLowerCase() == "kurang sekali" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "keajegan kerja" ? (
          summaryCreplin.janker_remarks.toLowerCase() == "kurang" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "keajegan kerja" ? (
          summaryCreplin.janker_remarks.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "keajegan kerja" ? (
          summaryCreplin.janker_remarks.toLowerCase() == "baik" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "keajegan kerja" ? (
          summaryCreplin.janker_remarks.toLowerCase() == "baik sekali" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}

        {item.toLowerCase() == "ketahanan kerja" ? (
          summaryCreplin.hanker_remarks.toLowerCase() == "kurang sekali" ? (
            type == "kurang sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketahanan kerja" ? (
          summaryCreplin.hanker_remarks.toLowerCase() == "kurang" ? (
            type == "kurang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketahanan kerja" ? (
          summaryCreplin.hanker_remarks.toLowerCase() == "sedang" ? (
            type == "sedang" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketahanan kerja" ? (
          summaryCreplin.hanker_remarks.toLowerCase() == "baik" ? (
            type == "baik" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
        {item.toLowerCase() == "ketahanan kerja" ? (
          summaryCreplin.hanker_remarks.toLowerCase() == "baik sekali" ? (
            type == "baik sekali" ? (
              <Image style={styles.checlistIcon} src={checlistIcon} />
            ) : null
          ) : null
        ) : null}
      </View>
    );
  };

  const DocumentSummaryItem = (props: any) => {
    const { item, key, index } = props;
    return (
      <>
        <View key={key} style={styles.summaryContentItem}>
          <View style={{ width: 350, flexDirection: "row" }}>
            <View style={styles.summaryContentItemTitle}>
              <Text style={{ fontSize: 9, marginTop: 3 }}>{index + 1}.</Text>
            </View>
            <View style={{ marginLeft: 5, marginTop: 7 }}>
              <Text style={{ fontSize: 9, marginTop: 3 }}>{item}</Text>
            </View>
          </View>
          <View style={styles.summaryChildContentRightTitle}>
            {item == "Score Inteligensi Quotient (IQ)" ? (
              <>
                <View style={{ marginLeft: 5, marginTop: 7 }}>
                  <Text style={{ fontSize: 9, marginTop: 3 }}>
                    {summaryIq} ({iqValueRemarks})
                  </Text>
                </View>
              </>
            ) : (
              <>
                <DocumentSummaryGridScore item={item} type="kurang sekali" />
                <DocumentSummaryGridScore item={item} type="kurang" />
                <DocumentSummaryGridScore item={item} type="sedang" />
                <DocumentSummaryGridScore item={item} type="baik" />
                <DocumentSummaryGridScore item={item} type="baik sekali" />
              </>
            )}
          </View>
        </View>
      </>
    );
  };

  const DocumentSummaryKepribadian = (props: any) => {
    return (
      <>
        <View style={styles.summaryChildContent}>
          <View style={styles.summaryChildContentTitle}>
            <Text style={{ fontSize: 10, marginTop: 3 }}>C. KEPRIBADIAN</Text>
          </View>
        </View>
        {Object.keys(feedback).length > 0 ? (
          <>
            {feedback.candidates_describes.map((item: any, key: any) => {
              return (
                <>
                  <View key={key} style={styles.summaryContentItem}>
                    <View style={{ width: 400, flexDirection: "row"}}>
                      <View style={styles.summaryContentItemTitle}>
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {key + 1}.
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 5,
                          borderRightWidth: 0.5,
                          width: 150,
                        }}
                      >
                        <Text style={{ fontSize: 9, marginTop: 7,}}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{ marginLeft: 5, marginTop: 7, width: 200}}>
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {item.remarks}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              );
            })}
          </>
        ) : (
          <>
            {dataItemKepribadian.map((item: any, key: any) => {
              return (
                <>
                  <View key={key} style={styles.summaryContentItem}>
                    <View style={{ width: 350, flexDirection: "row"}}>
                      <View style={styles.summaryContentItemTitle}>
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {key + 1}.
                        </Text>
                      </View>
                      <View style={{ marginLeft: 5, marginTop: 7 }}>
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              );
            })}
          </>
        )}

        <View style={styles.spaceBoxItem}></View>
      </>
    );
  };

  const DocumentGrafikResult = () => {
    return (
      <>
        <View style={styles.summaryChildContent}>
          <View style={styles.summaryChildContentTitle}>
            <Text style={{ fontSize: 10, marginTop: 3 }}>D. GRAFIK</Text>
          </View>
        </View>
        <View style={styles.grafikContent}>
          {Object.keys(feedback).length > 0 && fotoGrafik != null ? (
            <>
            <Image
                    src={fotoGrafik}
                    style={styles.grafikImage}
                  />
            </>
          ) : null}
          <View style={styles.grafikContentItem}>
            <Text style={{ fontSize: 9, marginTop: 3, width: 10 }}>D</Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 100 }}>
              Dominan
            </Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 150 }}>
              Tegas, keras, ambisius
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 9, marginTop: 3, width: 10 }}>I</Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 100 }}>
              Influen/Intim
            </Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 150 }}>
              Mudah mempengaruhi orang, penampilan
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 9, marginTop: 3, width: 10 }}>S</Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 100 }}>
              Stabil
            </Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 150 }}>
              Tekun, lambat, tidak berani konfontrasi, nurut
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 9, marginTop: 3, width: 10 }}>C</Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 100 }}>
              Cermat/complient
            </Text>
            <Text style={{ fontSize: 9, marginTop: 3, width: 150 }}>
              Detail, Cerewet
            </Text>
          </View>
        </View>
      </>
    );
  };

  const DocumentRekomendasiItem = (props: any) => {
    const { item = "" } = props;
    return (
      <View style={styles.summaryRekomendasiContentItemResult}>
        <View style={styles.summaryRekomendasiContentItemResultBox}>
          {Object.keys(feedback).length > 0 ? (
            <>
              {feedback.result == item ? (
                <>
                  <Image src={checlistIcon} style={styles.checlistIcon}></Image>
                </>
              ) : null}
            </>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 9, marginTop: 3 }}> {item}</Text>
        </View>
      </View>
    );
  };

  const DocumentRekomendasiResult = () => {
    return (
      <>
        <View style={styles.summaryRekomendasiContent}>
          <View style={styles.summaryRekomendasiContentTitle}>
            <Text style={{ fontSize: 10, marginTop: 3 }}>REKOMENDASI</Text>
          </View>
        </View>
        <View style={styles.summaryRekomendasiContent}>
          <View style={styles.summaryRekomendasiContentItem}>
            <DocumentRekomendasiItem item="DISARANKAN" />
            <DocumentRekomendasiItem item="DISARANKAN DENGAN CATATAN" />
            <DocumentRekomendasiItem item="KURANG DISARANKAN" />
            <DocumentRekomendasiItem item="TIDAK DISARANKAN" />
          </View>
          <View style={{ padding: 6 }}>
            <Text style={{ fontSize: 9, marginTop: 3, fontWeight: "bold" }}>
              REMARKS :
            </Text>
            {Object.keys(feedback).length > 0 ? (
              <>
                <Text style={{ fontSize: 9, marginTop: 3 }}>
                  {feedback.remarks}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </>
    );
  };

  const DocumentSummaryContent = (props: any) => {
    const { title = "", dataItem = [] } = props;
    return (
      <>
        <View style={styles.summaryChildContent}>
          <View style={styles.summaryChildContentTitle}>
            <Text style={{ fontSize: 10, marginTop: 3 }}>{title}</Text>
          </View>
          <View style={styles.summaryChildContentRightTitle}>
            <View style={styles.summaryChildContentRightBoxTitle}>
              <Text style={{ fontSize: 10, textAlign: "center" }}>1</Text>
              <Text style={{ fontSize: 9 }}>Sangat Kurang</Text>
            </View>
            <View style={styles.summaryChildContentRightBoxTitle}>
              <Text style={{ fontSize: 10 }}>2</Text>
              <Text style={{ fontSize: 9 }}>Kurang</Text>
            </View>
            <View style={styles.summaryChildContentRightBoxTitle}>
              <Text style={{ fontSize: 10 }}>3</Text>
              <Text style={{ fontSize: 9 }}>Sedang</Text>
            </View>
            <View style={styles.summaryChildContentRightBoxTitle}>
              <Text style={{ fontSize: 10 }}>4</Text>
              <Text style={{ fontSize: 9 }}>Baik</Text>
            </View>
            <View style={styles.summaryChildContentRightBoxTitle}>
              <Text
                style={{ fontSize: 10, textAlign: "center", marginLeft: 3 }}
              >
                5
              </Text>
              <Text style={{ fontSize: 9 }}>Baik Sekali</Text>
            </View>
          </View>
        </View>
        {dataItem.map((item: any, index: number) => {
          return <DocumentSummaryItem key={index} item={item} index={index} />;
        })}
      </>
    );
  };

  const DocumentSummary = () => {
    return (
      <>
        <View style={styles.summaryContent}>
          <View style={{ marginTop: "3px" }}>
            <Text style={{ fontSize: 12 }}>ASPEK PSIKOLOGIS</Text>
          </View>
          <View style={{ marginTop: "3px" }}>
            <Text style={{ fontSize: 12 }}>LEVEL SCORE</Text>
          </View>
        </View>
        <DocumentSummaryContent
          title={"A. INTELEGENSI"}
          dataItem={dataItemSummary}
        />
        <View style={styles.spaceBoxItem}></View>
        <DocumentSummaryContent
          title={"B. SIKAP KERJA"}
          dataItem={dataItemSikapKerja}
        />
      </>
    );
  };

  return (
    <PDFViewer style={{ width: "100%", height: "800px" }}>
      <Document title="Summary Report Psikotest">
        <Page size="A4" wrap={true} style={styles.page}>
          <HeadDocument />
          <DocumentPemeriksaan />
          <DocumentSummary />
          <Text
            style={styles.numberPage}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
        <Page size="A4" wrap={true} style={styles.page}>
          <View style={{ marginTop: 10 }}></View>
          <DocumentSummaryKepribadian />
          <DocumentGrafikResult />
          <DocumentRekomendasiResult />
          <Text
            style={styles.numberPage}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default DocumentTestPdfViewer;
