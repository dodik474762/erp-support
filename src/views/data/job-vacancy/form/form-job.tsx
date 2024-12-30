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

const FormJobViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [namaJob, setNamaJob] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [company, setCompany]: any = useState({});
  const [companys, setCompanys]: any = useState([]);

  const postData: any = {
    id: id,
    nama_job: namaJob,
    remarks: remarks,
    company: company,
  };

  const fetchDataCompany = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/company/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res.is_valid) {
      const value = res.data.map((item: any) => {
        return { value: item.id, label: item.nama };
      });
      setCompanys(value);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setNamaJob(req.data.nama_job);
      setRemarks(req.data.remarks);
      setCompany({
        value: req.data.code_company,
        label: req.data.nama_company,
      });
    }
    setLoading(false);
  };

  const handleSelectionChange = (e: any) => {
    companys.forEach((option: any) => {
      if (option.value === e.value) {
        setCompany(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (Object.keys(data.company).length == 0) {
      setErrors({ message: "Perusahaan Harus Diisi" });
      return false;
    }

    if (data.nama_job == "") {
      setErrors({ message: "Nama Job Harus Diisi" });
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
      const req: any = await ApiServices.submit(base_url, postData, "");
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses");
        router.push(base_url);
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

    fetchDataCompany();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Job Vacancy Add" />

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
                    Perusahaan
                  </label>
                  <Select
                    options={companys}
                    onChange={(e: any) => handleSelectionChange(e)}
                    defaultValue={company}
                  />
                  <div className="invalid-feedback">
                    Please Enter a parent menu
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nama Job
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama job"
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

export default FormJobViews;
