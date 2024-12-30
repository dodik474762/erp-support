import { View, Text } from "@react-pdf/renderer";
import { Fragment } from "react";


const PurchaseInvoicePdfItem = ({
    items = [],
}) => {
    return (
        <>
         {items.map((item: any, index: number) => {
            return (
              <Fragment key={item.id}>
                <View style={{ width: "100%", flexDirection: "row" }}>
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
                    <Text>{item.created_by}</Text>
                  </View>
                  <View
                    style={{
                      fontSize: 9,
                      paddingTop: 4,
                      paddingLeft: 7,
                      flex: 1,
                      borderColor: "whitesmoke",
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text>{item.supplier_name}</Text>
                  </View>
                  <View
                    style={{
                      fontSize: 9,
                      paddingTop: 4,
                      paddingLeft: 7,
                      flex: 1,
                      borderColor: "whitesmoke",
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text>{item.code}</Text>
                  </View>
                  <View
                    style={{
                      fontSize: 9,
                      paddingTop: 4,
                      paddingLeft: 7,
                      flex: 1,
                      borderColor: "whitesmoke",
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text>{item.grand_total}</Text>
                  </View>
                  <View
                    style={{
                      fontSize: 9,
                      paddingTop: 4,
                      paddingLeft: 7,
                      flex: 1,
                      borderColor: "whitesmoke",
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text>{item.date_transaction}</Text>
                  </View>
                  <View
                    style={{
                      fontSize: 9,
                      paddingTop: 4,
                      paddingLeft: 7,
                      paddingRight: 7,
                      flex: 1,
                      borderColor: "whitesmoke",
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      textAlign: "right",
                    }}
                  >
                    <Text>{item.status}</Text>
                  </View>
                </View>
              </Fragment>
            );
          })}
        </>
    );
}

export default PurchaseInvoicePdfItem;