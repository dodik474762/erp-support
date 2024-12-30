import Image from "next/image";
import ExampleImgModalPreviewsViews from "./modal/example_img_modal_preview._views";

const ExampleAddImageViews = ({
  fileImg = null,
  handleChangeFile = (e: any) => {},
}) => {
  return (
    <>
      <div className="mb-4">
        <h5 className="fs-14 mb-1">Product Image</h5>
        <p className="text-muted">Add Product main Image.</p>
        <div className="text-center">
          <div className="position-relative d-inline-block">
            <div className="position-absolute top-100 start-100 translate-middle">
              <label
                htmlFor="product-image-input"
                className="mb-0"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Select Image"
              >
                <div className="avatar-xs">
                  <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                    <i className="ri-image-fill"></i>
                  </div>
                </div>
              </label>
              <input
                className="form-control d-none"
                value=""
                id="product-image-input"
                type="file"
                onInput={(e: any) => handleChangeFile(e)}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <div className="avatar-lg">
              <div className="avatar-title bg-light rounded">
                {fileImg == null ? (
                  <Image
                    src="/assets/images/no-pictures.png"
                    id="product-img"
                    className="avatar-md h-auto"
                    width={150}
                    height={150}
                    alt={""}
                  />
                ) : (
                  <Image
                    src={URL.createObjectURL(fileImg)}
                    id="product-img"
                    className="avatar-md h-auto"
                    width={150}
                    height={150}
                    alt={""}
                    data-bs-toggle="modal"
                    data-bs-target={".bs-example-modal-img0"}
                  />
                )}
              </div>

              <ExampleImgModalPreviewsViews
                file={fileImg}
                index={0}
                className="bs-example-modal-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleAddImageViews;
