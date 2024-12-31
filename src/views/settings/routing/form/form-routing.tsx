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
import moment from "moment-timezone";
import FormTableRouting from "./form-routing-items";
import FormModalItems from "./modal/form-input-items";

const FormRoutingViews = ({ base_url = "" }) => {
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const router = useRouter();
  const id = router.query.id ?? "";
  const classNameModal = "modal-routing-items";

  const [name, setName] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [menu, setMenu]: any = useState(null);
  const [dataMenu, setDataMenu]: any = useState([]);
  const [type, setType] = useState(null);
  const [types, setTypes] = useState([]);
  const [items, setItems] : any= useState([]);
  const [users, setUsers] = useState([]);

  const dataRoutingLines = useRef([]) as any;

  const postData: any = {
    id: id,
    menu: menu,
    remarks: remarks,
    items: dataRoutingLines.current,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setRemarks(req.data.remarks);
      setName(req.data.department_name);
    }
    setLoading(false);
  };

  const handleSelectionChange = (e: any) => {
    dataMenu.forEach((option: any) => {
      if (option.value === e.value) {
        setMenu(option);
      }
    });
  };

  const fetchDataMenu = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/settings/menu/getAllMenuRouting",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.name });
        });

        setDataMenu(val);
      }
    }
  };

  const fetchDataTypeRouting = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/dictionary/getAll?context=RT_ACCESS",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.term_id, label: item.keterangan });
        });
        setTypes(val);
      }
    }
  };
 
  const fetchDataUsers = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/users/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.name });
        });
        setUsers(val);
      }
    }
  };

  const handleRemove = async (id: number) => {
    id = id + 1;
    await setItems(items.filter((item: any) => item.id !== id));
    dataRoutingLines.current = dataRoutingLines.current.filter(
      (item: any) => item.id !== id
    );
  };

  const handleAddItems = async (e: any, users: any, type : any) => {
    // e.preventDefault();
    const typeRouting = type;
    const result = {
      id: dataRoutingLines.current.length + 1,
      users: users,
      type: typeRouting,
    };

    if (result.users == null || Object.keys(result.users).length == 0) {
      setErrors({ message: "Users Harus Diisi" });
      return;
    }

    await setItems([...items, result]);
    dataRoutingLines.current.push(result);
  };

  const validation = (data: any): boolean => {
    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (Object.keys(data.menu).length == 0 || data.menu == null) {
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
    fetchDataMenu();
    fetchDataTypeRouting();
    fetchDataUsers();
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Form Routing" subTitle="Routing Add" />

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
              <div className="card-header">
                <h5 className="card-title mb-0">Routing</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Menu
                  </label>
                  <Select
                    defaultValue={menu}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={dataMenu}
                  />
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

            <FormTableRouting
              items={items}
              classNameModal={"." + classNameModal}
              handleRemove={handleRemove}
            />

            <FormModalItems
              className={classNameModal}
              handleAddItems={handleAddItems}
              error={errors}
              typesRouting={types}
              users={users}
            />

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

export default FormRoutingViews;
