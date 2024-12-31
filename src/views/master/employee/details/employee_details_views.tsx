



import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const EmployeeDetailsViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const id:any = router.query.id;

  const [data, setData]: any = useState({});
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const req:any = await ApiServices.getDataById(id, base_url);
    if(req.is_valid == true){
      setData(req.data);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle={"Employee Details ID : "+id} />

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
                    Job title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Job title name"
                    value={data.job_name}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a name.
                  </div>
                </div>
              <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Department"
                    value={data.department_name}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a name.
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter name"
                    value={data.name}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a name.
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter address"
                    value={data.address}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a address.
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mb-3">
              <Link
                href="/master/employee"
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

export default EmployeeDetailsViews;
