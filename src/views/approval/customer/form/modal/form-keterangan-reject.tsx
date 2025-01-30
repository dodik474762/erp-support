import { useState } from "react";

const FormModalKeteranganReject = (props: any) => {
  const { error, className, handleReject = () => {},} = props;

  const [remarks, setRemarks] = useState("");

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
            <div className="modal-header bg-light p-3">
              <h5 className="modal-title" id="exampleModalLabel">
                Remarks Rejected
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-modal"
              ></button>
            </div>
            {error == null ? null : (
              <>
                <div className="alert alert-danger mb-xl-0" role="alert">
                  {error.message} <strong> Peringatan! </strong>
                </div>
                <br />
              </>
            )}
            <div className="alert border-dashed alert-danger" role="alert">
              <div className="d-flex align-items-center">
                <div className="ms-2">
                  <h5 className="fs-14 text-danger fw-semibold">
                    Form Input Remarks Reject
                  </h5>
                  <p className="text-black mb-1">Pastikan data dengan benar </p>
                </div>
              </div>
            </div>
            <form action="javascript:void(0);">
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter keterangan"
                    value={remarks}
                    onInput={(e: any) => setRemarks(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a keterangan
                  </div>
                </div>
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
                  <button
                    type="button"
                    className="btn btn-success"
                    id="add-btn"
                    style={{ display: "block" }}
                    onClick={(e) => handleReject(e, remarks)}
                  >
                    Submit
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

export default FormModalKeteranganReject;
