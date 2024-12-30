import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const FormIntroductionTestViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const test_sub = router.query.test_sub;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [remarks, setRemarks] = useState(``);
  const [timetest, setTimetest] : any= useState(null);
  const [tipe, setTipe]: any = useState({ value: "TEXT", label: "TEXT" });
  const [tipes, setTipes]: any = useState([
    { value: "IMAGE", label: "IMAGE" },
    { value: "TEXT", label: "TEXT" },
  ]);
  const [fileImage, setFileImage] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    test_sub: test_sub,
    type: tipe,
    remarks: remarks,
    timetest: timetest,
    fileImage: fileImage,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataByIdCustom(
      String(id),
      base_url,
      "/get-detail-introduction?id=" + id
    );
    if (req.is_valid == true) {
      setRemarks(req.data.remarks);
      setTipe({ value: req.data.type, label: req.data.type });
      setFileImage(req.data.file);
      setFilePath(req.data.file_path);
    }
    setLoading(false);
  };

  const handleSelectionTypeChange = (e: any) => {
    tipes.forEach((option: any) => {
      if (option.value === e.value) {
        setTipe(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (tipe.value == "IMAGE") {
      if (data.fileImage == null) {
        setErrors({ message: "File Image Harus Diisi" });
        return false;
      }
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      // console.log(postData);
      const file: any = document.getElementById("fileImage");

      const formData: any = new FormData();
      formData.append("data", JSON.stringify(postData));
      if (file) {
        formData.append("fileImage", file?.files[0]);
      }

      const req: any = await ApiServices.submitMultiForm(
        base_url,
        formData,
        "/submit-introduction"
      );
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses");
        router.push(base_url + "/details-subtest?id=" + test_sub);
      } else {
        Message.info(req.message);
        setErrors({ message: req.message });
      }
      setLoading(false);
    } else {
      Message.info("Silahkan Lengkapi Data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Test Introduction Add" />

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
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Tipe
                  </label>
                  <Select
                    defaultValue={tipe}
                    onChange={(e: any) => handleSelectionTypeChange(e)}
                    options={tipes}
                  />
                </div>
                {tipe.value === "TEXT" ? null : (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="fileImage">
                      Gambar
                    </label>
                    
                    {filePath == null ? (
                      <input
                        type="file"
                        className="form-control"
                        id="fileImage"
                        placeholder="Enter gambar"
                        onChange={(e: any) => setFileImage(e.target.value)}
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <Link
                          href={
                            process.env.BASE_URL_SERVER +
                            "/" +
                            filePath +
                            "/" +
                            fileImage
                          }
                          target="_blank"
                        >
                          {fileImage}
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setFileImage(null);
                            setFilePath(null);
                          }}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Waktu lama dalam Detik
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter waktu lama"
                    value={timetest}
                    onInput={(e: any) => setTimetest(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a waktu lama
                  </div>
                </div>
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
                href={base_url + "/details-subtest?id=" + test_sub}
                className="btn btn-soft-info waves-effect waves-light"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormIntroductionTestViews;
