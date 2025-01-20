import dynamic from "next/dynamic";
import { useState } from "react";

const FormModalSalesItems = (props: any) => {
  const {
    error,
    className,
    handleAddItems = () => {},
    typePrice = [],
  } = props;

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const [price, setPrice] = useState(0);
  const [type, setType] = useState(null);
  
  const handleSelectionChange = (e: any) => {
    typePrice.forEach((option: any) => {
      if (option.value === e.value) {
        setType(option);
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
                Add Price Items
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
                    Form Input Price Items
                  </h5>
                  <p className="text-black mb-1">Pastikan data dengan benar </p>
                </div>
              </div>
            </div>
            <form action="javascript:void(0);">
              <div className="modal-body">
              <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Type
                  </label>
                  <Select
                    defaultValue={type}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={typePrice}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter price"
                    value={price}
                    onInput={(e: any) => setPrice(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a price</div>
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
                    onClick={(e) => handleAddItems(e, price, type)}
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

export default FormModalSalesItems;
