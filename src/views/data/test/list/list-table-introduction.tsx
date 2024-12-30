import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListInstroductionTableViews = ({
  filterKeyword = "",
  test = 0,
  base_url = "",
  handleCheck = (e: any, data: number) => {},
  handleCheckAll = (e: any) => {},
  resultAction = (result: any) => {},
}) => {
  const router = useRouter();
  const [token, setToken] : any = useState(null);
  const [loading, setLoading] = useState(false);
  const handleRouting = (e: any, url: string) => {
    e.preventDefault();
    router.push(url);
  };

  const handleDeleteData = (e: any, id: any) => {
    e.preventDefault();
    Message.question("Apa anda yakin menghapus data ini?", async () => {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const req = await fetch(
        process.env.API_BASE_URL + base_url + "/delete-introduction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      const res = await req.json();
      setLoading(false);
      resultAction(res);
    });
  };

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <>
      {loading == false ? (
        <>
          <Grid
            columns={[
              {
                id: "id",
                plugins: {
                  component: RowSelection,
                },
                name: _(
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkAll"
                        value="option1"
                        onInput={(e: any) => handleCheckAll(e)}
                      />
                    </div>
                  </>
                ),
                width: "50px",
                formatter: (cell, row, column) => {
                  return _(
                    <>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkItem"
                          value={String(row.cells[0].data)}
                          onInput={(e: any) =>
                            handleCheck(e, Number(row.cells[0].data))
                          }
                        />
                      </div>
                    </>
                  );
                },
              },
              {
                id: "judul",
                name: "JUDUL",
              },
              {
                id: "category_name",
                name: "KATEGORI",
              },
              {
                id: "remarks",
                name: "KETERANGAN",
              },
              {
                id: "file",
                name: "FILE IMAGE",
                formatter(cell, row, column) {
                  return _(
                    <>
                      <Link
                        href={String(row.cells[4].data)}
                        target="_blank"
                        className="text-primary"
                      >
                        Lihat File
                      </Link>
                    </>
                  );
                },
              },
              {
                id: "type",
                name: "TIPE",
              },
              {
                name: "Actions",
                formatter(cell, row, column) {
                  return _(
                    <>
                      <ul className="list-inline hstack gap-2 mb-0">
                        <li
                          className="list-inline-item edit"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Edit"
                        >
                          <Link
                            href={
                              base_url +
                              "/edit-introduction?id=" +
                              row.cells[0].data +
                              "&test_sub=" +
                              test
                            }
                            onClick={(e) =>
                              handleRouting(
                                e,
                                base_url +
                                  "/edit-introduction?id=" +
                                  row.cells[0].data +
                                  "&test_sub=" +
                                  test
                              )
                            }
                            className="text-primary d-inline-block edit-item-btn"
                          >
                            <i className="ri-pencil-fill fs-16"></i>
                          </Link>
                        </li>
                        <li
                          className="list-inline-item"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Remove"
                        >
                          <Link
                            className="text-danger d-inline-block remove-item-btn"
                            href={
                              base_url +
                              "/delete-introduction/" +
                              row.cells[0].data
                            }
                            onClick={(e: any) =>
                              handleDeleteData(e, row.cells[0].data)
                            }
                          >
                            <i className="ri-delete-bin-5-fill fs-16"></i>
                          </Link>
                        </li>
                      </ul>
                    </>
                  );
                },
              },
            ]}
            fixedHeader={true}
            // height="700px"
            pagination={{
              limit: 100,
              server: {
                url: (prev, page, limit) => {
                  const prevUrl = prev.split("?");
                  return prevUrl.length > 1
                    ? `${prev}&limit=${limit}&page=${page * limit}`
                    : `${prev}?limit=${limit}&page=${page * limit}`;
                },
              },
            }}
            server={{
              url:
                process.env.API_BASE_URL +
                base_url +
                `/get-introduction?filterdate=&search=${filterKeyword}&order=id&test_sub=${test}`,
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              then: (result) => {
                return result.data.map((resp: any, index: number) => [
                  resp.id,
                  resp.judul,
                  resp.category_name,
                  resp.remarks,
                  resp.type.toLowerCase() == "image"
                    ? process.env.BASE_URL_SERVER +'/'+ resp.file_path + "/" + resp.file
                    : null,
                  resp.type,
                  null,
                ]);
              },
              total: (result) => result.recordsFiltered,
            }}
            style={{
              th: {
                color: "#878A99",
                "white-space": "nowrap",
                "background-color": "#F3F6F9",
              },
            }}
          />
        </>
      ) : (
        <div
          className="text-center"
          style={{ marginTop: "200px", marginBottom: "200px" }}
        >
          <button className="btn btn-outline-primary btn-load">
            <span className="d-flex align-items-center">
              <span className="flex-grow-1 me-2">
                Sedang Proses Hapus Data...
              </span>
              <span className="spinner-border flex-shrink-0" role="status">
                <span className="visually-hidden">
                  Sedang Proses Hapus Data
                </span>
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default ListInstroductionTableViews;
