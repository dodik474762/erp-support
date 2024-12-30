import { _, Grid } from "gridjs-react";

const ExampleTableImportViews = ({
  data = [],
  handleRemoveRowsImport = (e: any, row: any) => {},
}) => {
  return (
    <>
      <Grid
        data={data}
        columns={[
          {
            id: "id",
            name: "No",
            width: "100px",
            formatter: (cell, row) => {
              console.log(row.cells[0].data);
              return row.cells[0].data;
            },
          },
          "NIK",
          "Username",
          {
            name: "Actions",
            formatter: (cell, row : any) => {
              return _(
                <div className="">
                  <button className="btn btn-danger btn-sm" onClick={(e: any) => handleRemoveRowsImport(e, row)}>
                    Delete
                  </button>
                </div>
              );
            },
          },
        ]}
        fixedHeader={true}
        height="700px"
        search={true}
        style={{
          th: {
            color: "#878A99",
            "white-space": "nowrap",
            "background-color": "#F3F6F9",
          },
        }}
      />
    </>
  );
};

export default ExampleTableImportViews;
