import dynamic from "next/dynamic";
import { useState } from "react";

const FormModalAnswer = (props: any) => {
  const {error, className, children, handleAddAnswer = () => {} } = props;

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const [remarks, setRemarks] = useState(``);
  const [tipe, setTipe]: any = useState({ value: "TEXT", label: "TEXT" });
  const [tipes, setTipes]: any = useState([
    { value: "IMAGE", label: "IMAGE" },
    { value: "TEXT", label: "TEXT" },
  ]);

  const handleSelectionChange = (e: any, type = "") => {
    tipes.forEach((option: any) => {
      if (option.value === e.value) {
        setTipe(option);
      }
    });
  };

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
                Add Answer
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
                    Form Input Jawaban
                  </h5>
                  <p className="text-black mb-1">Pastikan data dengan benar </p>
                </div>
              </div>
            </div>
            <form action="#">
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Tipe
                  </label>
                  <Select
                    defaultValue={tipe}
                    onChange={(e: any) => handleSelectionChange(e, "tipe")}
                    options={tipes}
                  />
                  <input type="hidden" value={tipe.value} name="tipe-answer"/>
                </div>
                {tipe.value === "TEXT" ? (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-title-input">
                      Answer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter answer"
                      name="answer"
                      //   value={questions}
                      //   onInput={(e: any) => setQuestions(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please Enter a answer
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="fileAnswer">
                      Answer Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="fileAnswer"
                      name="fileAnswer"
                      placeholder="Enter image"
                    />
                  </div>
                )}
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
                    name="remarks"
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
                    type="submit"
                    className="btn btn-success"
                    id="add-btn"
                    style={{ display: "block" }}
                    onClick={handleAddAnswer}
                  >
                    Add Data
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

export default FormModalAnswer;
