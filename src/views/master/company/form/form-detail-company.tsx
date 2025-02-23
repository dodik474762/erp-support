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

const CompanyDetailViews = ({
  base_url = "/",
}) => {
  const router = useRouter();
  const params: any = router.query;
  const id = params.id;
  //   console.log(id);

  const [name, setName] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const req:any = await ApiServices.getDataById(id, base_url);
    if(req.is_valid == true){
      setName(req.data.nama);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle={"Company Edit ID: "+id} />

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
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    disabled
                    placeholder="Enter company name"
                    value={name}
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a company name
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mb-3">
              &nbsp;
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

export default CompanyDetailViews;
