import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import ApiServices from "@/services/api.services";

const MenuEditViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const id = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [name, setName] = useState(``);
  const [path, setPath] = useState(``);
  const [icon, setIcon] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [dataParent, setDataParent] = useState([]);
  const [parent, setParent] = useState({ value: "", label: "" });

  const postData: any = {
    id: id,
    name: name,
    path: path,
    icon: icon,
    parent: parent,
  };

  const fetchData = async () => {
    const res:any = await ApiServices.getDataById(String(id), base_url);
    if(res.is_valid == true){
      setName(res.data.name);
      setPath(res.data.path);
      setIcon(res.data.icon);
      setParent({
        value: res.data.parent_code == null ? "" : res.data.parent_code,
        label: res.data.parent_name == null ? "" : res.data.parent_name,
      });
    }
  };

  const fetDataParentMenu = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + base_url+"/getParent",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res.is_valid) {
      const value = res.data.map((item: any) => {
        return { value: item.menu_code, label: item.name };
      });

      setDataParent(value);
    }
  };

  const handleSelectionChange = (e: any) => {
    dataParent.forEach((option: any) => {
      if (option.value === e.value) {
        setParent(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (data.name == "") {
      setErrors({ message: "Name Harus Diisi" });
      return false;
    }

    if (data.path == "") {
      setErrors({ message: "Path URL Harus Diisi" });
      return false;
    }

    // if (data.icon == "") {
    //   setErrors({ message: "Icon Menu Harus Diisi" });
    //   return false;
    // }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      const authToken = localStorage.getItem("authToken");
      const req = await fetch(
        process.env.API_BASE_URL +base_url +"/submit",
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
    fetDataParentMenu();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Settings" subTitle={"Menu Edit ID :" + id} />

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
                    Parent Menu
                  </label>
                  <Select
                    options={dataParent}
                    onChange={(e: any) => handleSelectionChange(e)}
                    defaultValue={parent}
                  />
                  <div className="invalid-feedback">
                    Please Enter a parent menu
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
                    value={name}
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a name</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Path URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    value={path}
                    placeholder="Enter path url"
                    onInput={(e: any) => setPath(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a path url
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Icon Menu
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    value={icon}
                    placeholder="Enter icon menu"
                    onInput={(e: any) => setIcon(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a icon menu
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

export default MenuEditViews;
