import PageTitle from "@/components/layouts/PageTitle";
import Link from "next/link";
import ExampleTableImportViews from "./example_table_import_views";
import { useEffect, useState } from "react";
const XLSX = require("xlsx");

const ExampleImportViews = () => {
  const [data, setData] = useState([]);
  const postData = {
    data: data,
  };

  type ImportObject = {
    id: string;
    nik: string;
    username: string;
    action: string;
  };

  const handleFileImport = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const datas = event.target.result;
      const workbook = XLSX.read(datas, { type: "binary" });
      const sheet_name_list = workbook.SheetNames;
      const rows: any = [];
      let counter = 1;
      sheet_name_list.forEach((sheet: any) => {
        const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        if (roa.length > 0) {
          roa.forEach((r: any) => {
            // console.log(r);
            const obj: ImportObject = {
              id: String(counter++),
              nik: r.Kode_Outlet || "",
              username: r.Nama_Salesman,
              action: "remove",
            };
            rows.push(obj);
          });
        }
      });
      setData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleRemoveRowsImport = (e: any, row: any) => {
    e.preventDefault();
    const id = row.cells[0].data;
    data.forEach((item: any, index) => {
      if (item.id === id) {
        data.splice(index, 1);
      }
    });

    const newData = [...data];
    setData(newData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {}, [data]);

  return (
    <>
      <PageTitle titlePage="Example" subTitle="Import" />
      <form
        id="createproduct-form"
        autoComplete="off"
        className="needs-validation"
        noValidate
      >
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-0">
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "6px", width: "100%" }}>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e: any) => handleFileImport(e)}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={""}
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={(e: any) => handleSubmit(e)}
                    >
                      Submit
                    </Link>
                    <Link
                      style={{ marginLeft: "6px" }}
                      href={"/example/import"}
                      className="btn btn-info"
                    >
                      <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                      Import
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ExampleTableImportViews
                  data={data}
                  handleRemoveRowsImport={(e: any, row: any) =>
                    handleRemoveRowsImport(e, row)
                  }
                />
              </div>

              <div className="card-footer">
                <div className="text-end">
                  <Link
                    href="/example"
                    className="btn btn-soft-info waves-effect waves-light"
                  >
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExampleImportViews;
