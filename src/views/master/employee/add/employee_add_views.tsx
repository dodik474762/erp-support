
import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";

const EmployeeAddViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [name, setName] = useState(``);
  const [address, setAddress] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [dataJobTitle, setDataJobTitle]: any = useState([]);
  const [job_title, setJobTitle]: any = useState(null);
  const [department, setDepartment]: any = useState(null);
  const [dataDepartment, setDataDepartment]: any = useState([]);

  const postData: any = {
    id: "",
    name: name,
    address: address,
    job_title: job_title,
    department: department,
  };

  const fetchDataJobTitle = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL +"/master/job_title/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          // console.log(item);
          val.push({ value: item.id, label: item.job_name });
        });

        setDataJobTitle(val);
      }
    }
  };
  
  const fetchDataDepartment = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL +"/master/department/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.department_name });
        });

        setDataDepartment(val);
      }
    }
  };

  const handleSelectionChange = (e: any) => {
    dataJobTitle.forEach((option: any) => {
      if (option.value === e.value) {
        setJobTitle(option);
      }
    });
  };

  const handleSelectionDepartment = (e: any) => {
    dataDepartment.forEach((option: any) => {
      if (option.value === e.value) {
        setDepartment(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (data.name == "") {
      setErrors({ message: "Name Harus Diisi" });
      return false;
    }

    if (data.address == "") {
      setErrors({ message: "Address Harus Diisi" });
      return false;
    }
    
    if (!data.job_title) {
      setErrors({ message: "Job Title Harus Diisi" });
      return false;
    }
    
    if (!data.department) {
      setErrors({ message: "Department Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(postData);
    // return;
    setLoading(true);
    if (validation(postData)) {
      const authToken = localStorage.getItem("authToken");
      const req = await fetch(
        process.env.API_BASE_URL + base_url+"/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (req.status == 200 || req.status == 201) {
        const res = await req.json();
        if (res.is_valid) {
          Message.success("Data Berhasil Diproses");
          await router.push(base_url);
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
    if (!router.isReady) return;

    fetchDataJobTitle();
    fetchDataDepartment();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle="Employee Add" />

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
                    Job Title
                  </label>
                  <Select
                    defaultValue={job_title}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={dataJobTitle}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Department
                  </label>
                  <Select
                    defaultValue={department}
                    onChange={(e: any) => handleSelectionDepartment(e)}
                    options={dataDepartment}
                  />
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
                    onInput={(e: any) => setName(e.target.value)}
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
                    onInput={(e: any) => setAddress(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a address.
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

export default EmployeeAddViews;
