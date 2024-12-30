import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const UsersEditViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id : any = router.query.id;
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [usersname, setUsersName] = useState(``);
  const [password, setPassword] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [dataRoles, setDataRoles]: any = useState([]);
  const [roles, setRoles]: any = useState(null);
  const [dataEmployee, setDataEmployee]: any = useState([]);
  const [employee, setEmployee]: any = useState(null);

  const postData: any = {
    id: id,
    username: usersname,
    password: password,
    roles: roles,
    employee: employee,
  };

  const fetchData = async () => {
    setLoading(true);
    const res: any = await ApiServices.getDataById(id, base_url);
    if (res.is_valid == true) {
      setUsersName(res.data.username);
      setPassword(res.data.password);
      setRoles({ value: res.data.roles, label: res.data.roles_name });
      setEmployee({
        value: res.data.employee_code,
        label: res.data.employee_name,
      });
    }
    setLoading(false);
  };

  const fetchDataRoles = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL + "/master/roles/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    const res = await req.json();
    if (res) {
      if(res.statusCode == 200 || res.statusCode == 201) {
        if (res.is_valid) {
          const rolesData: any = [];
          res.data.map((item: any) => {
            // console.log(item);
            rolesData.push({ value: item.id, label: item.roles_name });
          });
  
          setDataRoles(rolesData);
        }
      }
    }
  };

  const fetchDataEmployee = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/employee/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const value: any = [];
        res.data.map((item: any) => {
          // console.log(item);
          value.push({ value: item.employee_code, label: item.name });
        });

        setDataEmployee(value);
      }
    }
  };

  const handleSelectionChange = (e: any) => {
    dataRoles.forEach((option: any) => {
      if (option.value === e.value) {
        setRoles(option);
      }
    });
  };

  const handleSelectionEmployeeChange = (e: any) => {
    dataEmployee.forEach((option: any) => {
      if (option.value === e.value) {
        setEmployee(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (data.usersname == "") {
      setErrors({ message: "Username Harus Diisi" });
      return false;
    }

    if (data.password == "") {
      setErrors({ message: "Password Harus Diisi" });
      return false;
    }

    if (!data.roles) {
      setErrors({ message: "Roles Harus Diisi" });
      return false;
    }

    if (!data.employee) {
      setErrors({ message: "Employee Harus Diisi" });
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
      const req = await fetch(process.env.API_BASE_URL + base_url + "/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(postData),
      });
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

    fetchDataRoles();
    fetchDataEmployee();
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle="Roles Add" />

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
                    Employee Name
                  </label>
                  <Select
                    defaultValue={employee}
                    onChange={(e: any) => handleSelectionEmployeeChange(e)}
                    options={dataEmployee}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Status
                  </label>
                  <Select
                    defaultValue={roles}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={dataRoles}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter usersname"
                    value={usersname}
                    onInput={(e: any) => setUsersName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a username.
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter password"
                    value={password}
                    onInput={(e: any) => setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a password.
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

export default UsersEditViews;
