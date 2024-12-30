import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const DetailModalImageTest = (props: any) => {
  const { datas = [], className } = props;

  return (
    <>
      <div
        className={"modal fade  bs-example-modal-xl " + className}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert border-dashed alert-danger" role="alert">
              <div className="d-flex align-items-center">
                <div className="ms-2">
                  <h5 className="fs-14 text-danger fw-semibold">
                    Data Image Test
                  </h5>
                  <p className="text-black mb-1">Pastikan data dengan benar </p>
                </div>
              </div>
            </div>
            <form action="#">
              <div className="modal-body">
                {datas.length > 0 && (
                  <>
                    <table className="table table-bordered table-striped">
                      <thead style={{ backgroundColor: "#fef4e4" }}>
                        <tr>
                          <th>ID</th>
                          <th>Sub Test</th>
                          <th>File</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datas.map((item: any) => (
                          <>
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.chapter}</td>
                              <td>
                                <Link
                                  href={
                                    process.env.BASE_URL_SERVER +
                                    "/" +
                                    item.path_file +
                                    "/" +
                                    item.file
                                  }
                                  target="_blank"
                                >
                                  {item.file}
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
              <div className="modal-footer" style={{ display: "block" }}>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailModalImageTest;
