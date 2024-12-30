/* eslint-disable react/jsx-key */
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ExampleImgModalPreviewsViews from "./modal/example_img_modal_preview._views";

const ExampleAddDropzoneViews = ({
  onChangeFile = (file: any) => {},
  onDeletedFile = (file: any) => {},
}) => {
  const [files, setFiles]: any = useState([]);
  const dataFiles: any = [];
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    dataFiles.push(acceptedFiles[0]);
    setFiles(dataFiles);
    onChangeFile(acceptedFiles[0]);
    /** Preview */
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = (e: any, file: any) => {
    e.preventDefault();
    files.splice(files.indexOf(file), 1);
    dataFiles.splice(dataFiles.indexOf(file), 1);
    setFiles([...files]);
    onDeletedFile(files);
  };

  return (
    <>
      <div>
        <h5 className="fs-14 mb-1">Product Gallery</h5>
        <p className="text-muted">Add Product Gallery Images.</p>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="dropzone">
              {/* <div className="fallback">
                <input name="file" type="file" multiple />
              </div> */}
              <div className="dz-message needsclick">
                <div className="mb-3">
                  <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                </div>

                <h5>Drop files here to upload.</h5>
              </div>
            </div>
          ) : (
            <div className="dropzone">
              {/* <div className="fallback">
                <input name="file" type="file" multiple />
              </div> */}
              <div className="dz-message needsclick">
                <div className="mb-3">
                  <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                </div>

                <h5>Drop files here or click to upload.</h5>
              </div>
            </div>
          )}
        </div>

        <ul className="list-unstyled mb-0" id="dropzone-preview">
          {files.length > 0 ? (
            files.map((file: any, index: number) => (
              <li className="mt-2" id="dropzone-preview-list">
                <div className="border rounded">
                  <div className="d-flex p-2">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm bg-light rounded">
                        <Image
                          data-dz-thumbnail
                          className="img-fluid rounded d-block"
                          src={URL.createObjectURL(file)}
                          alt="Product-Image"
                          width={120}
                          height={120}
                          data-bs-toggle="modal"
                          data-bs-target={
                            ".bs-example-modal-center" + String(index)
                          }
                        />
                      </div>
                      <ExampleImgModalPreviewsViews file={file} index={index} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="pt-1">
                        <h5 className="fs-14 mb-1" data-dz-name>
                          &nbsp;
                        </h5>
                        <p className="fs-13 text-muted mb-0" data-dz-size></p>
                        <strong
                          className="error text-danger"
                          data-dz-errormessage
                        ></strong>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ms-3">
                      <button
                        data-dz-remove
                        className="btn btn-sm btn-danger"
                        onClick={(e: any) => deleteFile(e, file)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="mt-2" id="dropzone-preview-list">
              <div className="border rounded">
                <div className="d-flex p-2">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-sm bg-light rounded">
                      <Image
                        data-dz-thumbnail
                        className="img-fluid rounded d-block"
                        src="/assets/images/no-pictures.png"
                        alt="Product-Image"
                        width={120}
                        height={120}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="pt-1">
                      <h5 className="fs-14 mb-1" data-dz-name>
                        &nbsp;
                      </h5>
                      <p className="fs-13 text-muted mb-0" data-dz-size></p>
                      <strong
                        className="error text-danger"
                        data-dz-errormessage
                      ></strong>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-3"></div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ExampleAddDropzoneViews;
