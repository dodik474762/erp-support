import Image from "next/image";

const ExampleImgModalPreviewsViews = ({ file = null, index = 0, className = "bs-example-modal-center" }) => {
  return (
    <>
      {/* <!-- center modal --> */}
      <div
        className={
          "modal fade  bs-example-modal-xl " +className+
          String(index)
        }
        tabIndex={-1}
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body text-center p-5">
              <div className="mt-4">
                <h4 className="mb-3">Detail Image</h4>
                <div className="row">
                  <div className="col-md-12">
                    {file && (
                      <Image
                        data-dz-thumbnail
                        className="img-fluid rounded d-block"
                        src={URL.createObjectURL(file)}
                        alt="Product-Image"
                        width={800}
                        height={800}
                        data-bs-toggle="modal"
                        data-bs-target={
                          ".bs-example-modal-center" + String(index)
                        }
                      />
                    )}
                  </div>
                </div>
                <br />
                <div className="hstack gap-2 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- center modal --> */}
    </>
  );
};

export default ExampleImgModalPreviewsViews;
