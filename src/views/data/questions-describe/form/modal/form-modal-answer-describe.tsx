import dynamic from "next/dynamic";
import { useState } from "react";

const FormModalAnswerDescribe = (props: any) => {
  const { error, className, children, handleAddAnswer = () => {} } = props;

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const [remarks, setRemarks] = useState(``);
  const [most, setMost]: any = useState({ value: "persegi", label: "PERSEGI" });
  const [mosts, setMosts]: any = useState([
    { value: "persegi", label: "PERSEGI" },
    { value: "bintang", label: "BINTANG" },
    { value: "segitiga", label: "SEGITIGA" },
    { value: "huruf-z", label: "HURUF Z" },
    { value: "huruf-n", label: "HURUF N" },
  ]);
  const [least, setLeast]: any = useState({
    value: "persegi",
    label: "PERSEGI",
  });
  const [leasts, setLeasts]: any = useState([
    { value: "persegi", label: "PERSEGI" },
    { value: "bintang", label: "BINTANG" },
    { value: "segitiga", label: "SEGITIGA" },
    { value: "huruf-z", label: "HURUF Z" },
    { value: "huruf-n", label: "HURUF N" },
  ]);

  const handleSelectionChange = (e: any, type = "") => {
    switch (type) {
      case "most":
        mosts.forEach((option: any) => {
          if (option.value === e.value) {
            setMost(option);
          }
        });
        break;
      case "least":
        leasts.forEach((option: any) => {
          if (option.value === e.value) {
            setLeast(option);
          }
        });
        break;
    }
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
                    Most
                  </label>
                  <Select
                    defaultValue={most}
                    onChange={(e: any) => handleSelectionChange(e, "most")}
                    options={mosts}
                  />
                  <input type="hidden" value={most.value} name="most-answer" />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Least
                  </label>
                  <Select
                    defaultValue={least}
                    onChange={(e: any) => handleSelectionChange(e, "least")}
                    options={leasts}
                  />
                  <input type="hidden" value={least.value} name="least-answer" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Pernyataan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter pernyataan"
                    name="pernyataan"
                    //   value={questions}
                    //   onInput={(e: any) => setQuestions(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a pernyataan
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Deskripsi Personal
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter describe"
                    name="describe"
                    //   value={questions}
                    //   onInput={(e: any) => setQuestions(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a describe
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

export default FormModalAnswerDescribe;
