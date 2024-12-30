import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ExampleTableKaryawanViews = ({
  filterDate = "",
  filterKeyword = "",
  handleCheck = (e: any, data: number) => {},
  handleCheckAll = (e: any) => {},
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
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      // const req = await fetch(process.env.API_BASE_URL + "/master/users/delete", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: id
      //   }),
      // });
      // const res = await req.json();
      // if (res.is_valid) {
      //   Message.success("Data Berhasil Diproses");
      //   router.reload();
      // }else{
      //   Message.info(res.message);
      // }
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
                          value={String(row.cells[1].data)}
                          onInput={(e: any) =>
                            handleCheck(e, Number(row.cells[1].data))
                          }
                        />
                      </div>
                    </>
                  );
                },
              },
              "NIK",
              "Username",
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
                            href={"/example/details/" + row.cells[1].data}
                            onClick={(e) =>
                              handleRouting(
                                e,
                                "/example/details/" + row.cells[1].data
                              )
                            }
                            className="text-primary d-inline-block"
                          >
                            <i className="ri-eye-fill fs-16"></i>
                          </Link>
                        </li>
                        <li
                          className="list-inline-item edit"
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Edit"
                        >
                          <Link
                            href={"/example/edit/" + row.cells[1].data}
                            onClick={(e) =>
                              handleRouting(
                                e,
                                "/example/edit/" + row.cells[1].data
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
                            data-bs-toggle="modal"
                            href={"/example/delete/" + row.cells[1].data}
                            onClick={(e: any) =>
                              handleDeleteData(e, row.cells[1].data)
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
            height="700px"
            pagination={{
              limit: 100,
              server: {
                url: (prev, page, limit) => {
                  const prevUrl = prev.split("?");
                  return prevUrl.length > 1
                    ? `${prev}&length=${limit}&start=${page * limit}`
                    : `${prev}?length=${limit}&start=${page * limit}`;
                },
              },
            }}
            server={{
              url:
                process.env.NEXT_PUBLIC_API_BASE_URL +
                `/master/users/getData?filterdate=${filterDate}&search=${filterKeyword}`,
              method: "POST",
              then: (result) => {
                return result.data.map((user: any, index: number) => [
                  null,
                  user.nik,
                  user.username,
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
        <div className="text-center" style={{ marginTop: "200px", marginBottom: "200px" }}>
          <button className="btn btn-outline-primary btn-load">
          <span className="d-flex align-items-center">
            <span className="flex-grow-1 me-2">Sedang Proses Hapus Data...</span>
            <span className="spinner-border flex-shrink-0" role="status">
              <span className="visually-hidden">Sedang Proses Hapus Data</span>
            </span>
          </span>
        </button>
        </div>
      )}
    </>
  );
};

export default ExampleTableKaryawanViews;
