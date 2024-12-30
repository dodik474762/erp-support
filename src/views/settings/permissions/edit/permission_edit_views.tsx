
import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import ApiServices from "@/services/api.services";

const PermissionEditViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const id  = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [action, setAction] : any= useState(null);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [users, setUsers] = useState({ value: "", label: "" });
  const [dataMenu, setDataMenu] = useState([]);
  const [menu, setMenu] = useState({ value: "", label: "" });

  const dataAction = [
    { value: "create", label: "CREATE" },
    { value: "read", label: "READ" },
    { value: "update", label: "UPDATE" },
    { value: "delete", label: "DELETE" },
  ];

  const postData: any = {
    id: id,
    action: action,
    users: users,
    menu: menu,
  };

  const fetchData = async () => {
    const res: any = await ApiServices.getDataById(String(id), base_url);
    if (res.is_valid) {
      const data_action = res.data.action.split([',']);
      const data_action_new = [];
      for (let index = 0; index < data_action.length; index++) {
        data_action_new.push({ value: data_action[index], label: data_action[index].toUpperCase() });
      }
      setAction(data_action_new);

      setUsers({
        value: res.data.user_group,
        label: res.data.roles_name,
      });
      setMenu({
        value: res.data.menu + "/" + res.data.menu_code,
        label: res.data.menu_name,
      });
    }
  };

  const fetDataUsers = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL + "/master/roles/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res.is_valid) {
      const value = res.data.map((item: any) => {
        return { value: item.id, label: item.roles_name };
      });

      setDataUsers(value);
    }
  };
  
  const fetDataMenu = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL + "/settings/menu/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res.is_valid) {
      const value = res.data.map((item: any) => {
        return { value: item.id+"/"+item.menu_code, label: item.name };
      });

      setDataMenu(value);
    }
  };

  const handleSelectionChange = (e: any) => {
    dataUsers.forEach((option: any) => {
      if (option.value === e.value) {
        setUsers(option);
      }
    });
  };
  
  const handleSelectionMenuChange = (e: any) => {
    dataMenu.forEach((option: any) => {
      if (option.value === e.value) {
        setMenu(option);
      }
    });
  };

  const handleSelectionMultipleChange = (val: any[]) => {
    setAction(val);
  };

  const validation = (data: any): boolean => {
    if (data.action == "") {
      setErrors({ message: "Action Harus Diisi" });
      return false;
    }

    if (!data.users) {
      setErrors({ message: "Users Harus Diisi" });
      return false;
    }

    if (!data.menu) {
      setErrors({ message: "Menu Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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

    fetchData();
    fetDataUsers();
    fetDataMenu();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Settings" subTitle={"Permissions Edit ID : "+id} />

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
                    Menu
                  </label>
                  <Select
                    options={dataMenu}
                    onChange={(e: any) => handleSelectionMenuChange(e)}
                    defaultValue={menu}
                  />
                  <div className="invalid-feedback">Please Enter a users</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Users
                  </label>
                  <Select
                    options={dataUsers}
                    onChange={(e: any) => handleSelectionChange(e)}
                    defaultValue={users}
                  />
                  <div className="invalid-feedback">Please Enter a users</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Action
                  </label>
                  <Select
                    options={dataAction}
                    onChange={(e: any) => handleSelectionMultipleChange(e)}
                    isMulti
                    defaultValue={action}
                  />
                  <div className="invalid-feedback">Please Enter a action</div>
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

export default PermissionEditViews;
