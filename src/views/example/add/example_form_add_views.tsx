import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import ExampleAddImageViews from "./example_add_image_views";
import ExampleAddDropzoneViews from "./example_add_dropzone_views";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";

const ExampleFormAddViews = () => {
  const router = useRouter();
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [remarks, setRemarks] = useState(``);
  const [fileImg, setFileImg] = useState(null);
  const [datafiles, setDatafiles]: any = useState([]);
  const [productName, setProductName] = useState(``);
  const [publisDate, setPublisDate] = useState(new Date());
  const [selectedOption, setSelectedOption]: any = useState(null);
  const [selectedOptionVisible, setSelectedOptionVisible]: any = useState(null);
  const [selectedOptionMultiple, setSelectedOptionMultiple]: any =
    useState(null);
  const [description, setDescription] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const optionsVisibility = [
    { value: "public", label: "Public" },
    { value: "hidden", label: "Hidden" },
  ];

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const optionsMultiple = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const postData: any = {
    product_name: productName,
    product_description: remarks,
    product_img: fileImg,
    file: datafiles,
    publish_date: publisDate,
    category: selectedOption,
    visibility: selectedOptionVisible,
    tags: selectedOptionMultiple,
    description: description,
  };

  const handleSelectionChange = (e: any) => {
    options.forEach((option: any) => {
      if (option.value === e.value) {
        setSelectedOption(option);
      }
    });
  };

  const handleSelectionVisibilityChange = (e: any) => {
    optionsVisibility.forEach((option: any) => {
      if (option.value === e.value) {
        setSelectedOptionVisible(option);
      }
    });
  };

  const handleSelectionMultipleChange = (val: any[]) => {
    setSelectedOptionMultiple(val);
  };

  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    setFileImg(file);
  };

  const validation = (data: any): boolean => {
    if (data.product_name == "") {
      setErrors({ message: "Product Name Harus Diisi" });
      return false;
    }

    if (data.product_description == "") {
      setErrors({ message: "Product Description Harus Diisi" });
      return false;
    }

    if (data.publish_date == "") {
      setErrors({ message: "Publish Date Harus Diisi" });
      return false;
    }

    if (data.category == null) {
      setErrors({ message: "Category Harus Diisi" });
      return false;
    }

    if (data.visibility == null) {
      setErrors({ message: "Visibility Harus Diisi" });
      return false;
    }

    if (data.tags == null) {
      setErrors({ message: "Tags Harus Diisi" });
      return false;
    }

    if (data.description == "") {
      setErrors({ message: "Description Harus Diisi" });
      return false;
    }

    if (data.file == null) {
      setErrors({ message: "File Harus Diisi" });
      return false;
    }

    if (data.product_img == null) {
      setErrors({ message: "Product Image Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      const req = await fetch(
        process.env.API_BASE_URL + "/master/users/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (req.status == 200) {
        const res = await req.json();
        if (res.is_valid) {
          Message.success("Data Berhasil Diproses");
          await router.push("/example");
          router.reload();
        } else {
          Message.info(res.message);
          setErrors({ message: res.message });
        }
      } else {
        Message.info("Server Error " + req.status + " " + req.statusText);
        setErrors({
          message: "Terjadi Kesalahan Status Request " + req.status,
        });
      }
      setLoading(false);
    } else {
      Message.info("Silahkan Lengkapi Data");
      setLoading(false);
    }
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <PageTitle titlePage="Example" subTitle="Form Add" />

      {errors == null ? null : (
        <>
          <div className="alert alert-danger mb-xl-0" role="alert">
            {errors.message} <strong> Harus Diisi! </strong>
          </div>
          <br />
        </>
      )}

      <form
        id="createproduct-form"
        autoComplete="off"
        className="needs-validation"
        noValidate
      >
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Product Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter product title"
                    onKeyUp={(e: any) => setProductName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a product title.
                  </div>
                </div>
                <div>
                  <label>Product Description</label>
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={remarks}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        setRemarks(data);
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Product Gallery</h5>
              </div>
              <div className="card-body">
                <ExampleAddImageViews
                  fileImg={fileImg}
                  handleChangeFile={handleChangeFile}
                />

                <ExampleAddDropzoneViews
                  onChangeFile={(file) => {
                    setDatafiles([...datafiles, file]);
                    // postData.file.push(file);
                  }}
                  onDeletedFile={(files) => {
                    setDatafiles(files);
                  }}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <ul
                  className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#addproduct-general-info"
                      role="tab"
                    >
                      General Info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#addproduct-metadata"
                      role="tab"
                    >
                      Meta Data
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="addproduct-general-info"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Manufacturer Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="manufacturer-name-input"
                            placeholder="Enter manufacturer name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-brand-input"
                          >
                            Manufacturer Brand
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="manufacturer-brand-input"
                            placeholder="Enter manufacturer brand"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="stocks-input">
                            Stocks
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="stocks-input"
                            placeholder="Stocks"
                            required
                          />
                          <div className="invalid-feedback">
                            Please Enter a product stocks.
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="product-price-input"
                          >
                            Price
                          </label>
                          <div className="input-group has-validation mb-3">
                            <span
                              className="input-group-text"
                              id="product-price-addon"
                            >
                              $
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="product-price-input"
                              placeholder="Enter price"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                              required
                            />
                            <div className="invalid-feedback">
                              Please Enter a product price.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="product-discount-input"
                          >
                            Discount
                          </label>
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="product-discount-input"
                              placeholder="Enter discount"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="orders-input">
                            Orders
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="orders-input"
                            placeholder="Orders"
                            required
                          />
                          <div className="invalid-feedback">
                            Please Enter a product orders.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane"
                    id="addproduct-metadata"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="meta-title-input"
                          >
                            Meta title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter meta title"
                            id="meta-title-input"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="meta-keywords-input"
                          >
                            Meta Keywords
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter meta keywords"
                            id="meta-keywords-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        className="form-label"
                        htmlFor="meta-description-input"
                      >
                        Meta Description
                      </label>
                      <textarea
                        className="form-control"
                        id="meta-description-input"
                        placeholder="Enter meta description"
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <button
                  type="submit"
                  className="btn btn-success w-sm"
                  onClick={(e: any) => handleSubmit(e)}
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  Submit
                </button>
              )}
              &nbsp;
              <Link
                href="/example"
                className="btn btn-soft-info waves-effect waves-light"
              >
                Kembali
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Publish</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Status
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={options}
                  />
                </div>

                <div>
                  <label
                    htmlFor="choices-publish-visibility-input"
                    className="form-label"
                  >
                    Visibility
                  </label>
                  <Select
                    defaultValue={selectedOptionVisible}
                    onChange={(e: any) => handleSelectionVisibilityChange(e)}
                    options={optionsVisibility}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Publish Schedule</h5>
              </div>
              <div className="card-body">
                <div>
                  <label
                    htmlFor="datepicker-publish-input"
                    className="form-label"
                  >
                    Publish Date & Time
                  </label>
                  <Flatpickr
                    data-enable-time
                    className="form-control"
                    placeholder="Enter publish date"
                    value={publisDate}
                    data-date-format="Y-m-d"
                    onChange={([date]) => {
                      setPublisDate(date);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Product Categories</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-2">
                  {" "}
                  Select product category
                </p>
                <select
                  className="form-select"
                  id="choices-category-input"
                  name="choices-category-input"
                  data-choices
                  data-choices-search-false
                >
                  <option value="Appliances">Appliances</option>
                  <option value="Automotive Accessories">
                    Automotive Accessories
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Kids">Kids</option>
                  <option value="Watches">Watches</option>
                </select>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Product Tags</h5>
              </div>
              <div className="card-body">
                <div className="hstack gap-3 align-items-start">
                  <div className="flex-grow-1">
                    <Select
                      defaultValue={selectedOptionMultiple}
                      isMulti
                      onChange={(e: any) => handleSelectionMultipleChange(e)}
                      options={optionsMultiple}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Product Short Description</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-2">
                  Add short description for product
                </p>
                <textarea
                  className="form-control"
                  placeholder="Must enter minimum of a 100 characters"
                  rows={3}
                  onInput={(e: any) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExampleFormAddViews;
