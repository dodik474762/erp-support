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

const FormSubTestViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const test = router.query.test;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [judul, setJudul] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [timetest, setTimetest] : any = useState(null);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    judul: judul,
    test:test,
    timetest:timetest,
    remarks: remarks,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataByIdCustom(String(id), base_url, "/get-detail-subtest?id="+id);
    if (req.is_valid == true) {
      setJudul(req.data.judul);
      setRemarks(req.data.remarks);
      setTimetest(req.data.timetest);
    }
    setLoading(false);
  };

  const validation = (data: any): boolean => {
    if (data.judul == "") {
      setErrors({ message: "Judul Harus Diisi" });
      return false;
    }

    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      const req: any = await ApiServices.submit(base_url, postData, "/submit-subtest");
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses");
        router.push(base_url+"/details?id="+test);
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
      <PageTitle titlePage="Data" subTitle="Sub Test Add" />

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
                    Judul Sub Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter judul"
                    value={judul}
                    onInput={(e: any) => setJudul(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a judul</div>
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Batas Waktu Dalam Detik
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter batas waktu"
                    value={timetest}
                    onInput={(e: any) => setTimetest(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a batas waktu
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
                href={base_url+"/details?id="+test}
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

export default FormSubTestViews;
