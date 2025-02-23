import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const JobTitleDetailsViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const params: any = router.query;
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const req:any = await ApiServices.getDataById(id, base_url);
    if(req.is_valid == true){
      setData(req.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle={"Job Title Details ID: "+id}  />

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
                    Job Name
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter job name"
                    value={data && data.job_name}
                  />
                  <div className="invalid-feedback">
                    Please Enter a job name
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

export default JobTitleDetailsViews;
