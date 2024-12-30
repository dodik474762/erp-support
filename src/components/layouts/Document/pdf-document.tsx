import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { Fragment } from "react";

const PdfDocumentExported = ({
  header = [] as any,
  items = [] as any,
  keys = [] as any,
  title = '',
}) => {
  return (
    <PDFViewer style={{ width: "100%", height: "800px" }}>
      <Document>
        <Page
          // dpi={300} //untuk thermal
          // size="A4"
          wrap={true}
          size={{ width: 944, height: 665 }}
          // orientation="landscape"
          style={{
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 30,
            paddingRight: 30,
            lineHeight: 1.5,
            flexDirection: "column",
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 24 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#3E3E3E",
              }}
            >
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {title}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
            {header &&
              header.map((item: any, index: number) => {
                return (
                  <>
                    <View
                      style={[
                        {
                          marginTop: 20,
                          fontSize: 10,
                          fontStyle: "bold",
                          paddingTop: 4,
                          paddingLeft: 7,
                          flex: 1,
                          height: 20,
                          backgroundColor: "#DEDEDE",
                          borderColor: "whitesmoke",
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                        },
                        { flex: 1, borderRightWidth: 0, borderBottomWidth: 1 },
                      ]}
                    >
                      <Text>{item}</Text>
                    </View>
                  </>
                );
              })}
          </View>
          {items.map((item: any, index: number) => {
            return (
              <Fragment key={item.id}>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  {keys.map((key: any, index: number) => {
                    return (
                      <>
                        <View
                          style={[
                            {
                              fontSize: 9,
                              paddingTop: 4,
                              paddingLeft: 7,
                              flex: 1,
                              borderColor: "whitesmoke",
                              borderRightWidth: 1,
                              borderBottomWidth: 1,
                            },
                            { flex: 1, borderRightWidth: 1 },
                          ]}
                        >
                          <Text>{item[key]}</Text>
                        </View>
                      </>
                    );
                  })}
                </View>
              </Fragment>
            );
          })}

          <Text
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
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

export default PdfDocumentExported;
