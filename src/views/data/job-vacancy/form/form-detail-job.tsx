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

const FormJobDetailViews = ({
  base_url = ""
}) => {
  const router = useRouter();
  const id = router.query.id;

  const [namaJob, setNamaJob] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const req:any = await ApiServices.getDataById(String(id), base_url);
    if(req.is_valid == true){
      setNamaJob(req.data.nama_job);
      setRemarks(req.data.remarks);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!router.isReady) return;
    if(id){
        fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Job Vacancy Detail" />

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
                    Nama Job
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama job"
                    disabled
                    value={namaJob}
                    onInput={(e: any) => setNamaJob(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a nama job
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
                    disabled
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
              <Link
                href={base_url}
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

export default FormJobDetailViews;
