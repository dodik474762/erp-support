
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

const JobTitleEditViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const params: any = router.query;
  const id = params.id;
  //   console.log(id);

  const [jobName, setJobName] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    job_name: jobName,
  };

  const fetchData = async () => {
    setLoading(true);
    const res:any = await ApiServices.getDataById(id, base_url);
    if(res.is_valid == true){
      setJobName(res.data.job_name);
    }
    setLoading(false);
  };

  const validation = (data: any): boolean => {
    if (data.roles_name == "") {
      setErrors({ message: "Job Name Harus Diisi" });
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
        process.env.API_BASE_URL + base_url+"/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (req.status == 200 || req.status == 201) {
        const res = await req.json();
        if (res.is_valid) {
          Message.success("Data Berhasil Diproses");
          router.push(base_url);
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
    if(!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle={"Job Title Edit ID: "+id} />

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
                    Roles Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter roles name"
                    value={jobName}
                    onInput={(e: any) => setJobName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a job name
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

export default JobTitleEditViews;
