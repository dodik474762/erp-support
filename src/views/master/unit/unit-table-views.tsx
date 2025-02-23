import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const UnitTableViews = ({
  filterDate = "",
  filterKeyword = "",
  akses = "",
  base_url = "",
  handleCheck = (e: any, data: number) => {},
  handleCheckAll = (e: any) => {},
  resultAction = (result: any) => {},
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleRouting = (e: any, url: string) => {
    e.preventDefault();
    router.push(url);
  };

  const handleDeleteData = (e: any, id: any) => {
    e.preventDefault();
    Message.question("Apa anda yakin menghapus data ini?", async () => {
      setLoading(true);
      const req = await fetch(process.env.API_BASE_URL + base_url + "/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const res = await req.json();
      setLoading(false);
      resultAction(res);
    });
  };

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
                name: "NAME",
              },
              {
                name: "REMARKS",
              },
              {
                name: "Actions",
                formatter(cell, row, column) {
                  return _(
                    <>
                      <ul className="list-inline hstack gap-2 mb-0">
                        <li
                          className="list-inline-item"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="View"
                        >
                          <Link
                            href={base_url + "/details?id=" + row.cells[0].data}
                            onClick={(e) =>
                              handleRouting(
                                e,
                                base_url + "/details?id=" + row.cells[0].data
                              )
                            }
                            className="text-primary d-inline-block"
                          >
                            <i className="ri-eye-fill fs-16"></i>
                          </Link>
                        </li>
                        {akses.includes("update") ? (
                          <li
                            className="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <Link
                              href={base_url + "/edit?id=" + row.cells[0].data}
                              onClick={(e) =>
                                handleRouting(
                                  e,
                                  base_url + "/edit?id=" + row.cells[0].data
                                )
                              }
                              className="text-primary d-inline-block edit-item-btn"
                            >
                              <i className="ri-pencil-fill fs-16"></i>
                            </Link>
                          </li>
                        ) : null}
                        {akses.includes("delete") ? (
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
                              href={base_url + "/delete/" + row.cells[0].data}
                              onClick={(e: any) =>
                                handleDeleteData(e, row.cells[0].data)
                              }
                            >
                              <i className="ri-delete-bin-5-fill fs-16"></i>
                            </Link>
                          </li>
                        ) : null}
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
                base_url+`/getData?filterdate=${filterDate}&search=${filterKeyword}&order=id`,
              method: "GET",
              then: (result) => {
                return result.data.map((resp: any, index: number) => [
                  resp.id,
                  resp.name,
                  resp.remarks,
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

export default UnitTableViews;
