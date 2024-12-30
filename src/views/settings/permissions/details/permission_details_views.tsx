import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import ApiServices from "@/services/api.services";

const PermissionDetailViews = ({
  base_url = ''
}) => {
  const router = useRouter();
  const id = router.query.id;

  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState({});

  const fetchData = async () => {
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setData(req.data);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle
        titlePage="Settings"
        subTitle={"Permissions Detail ID : " + id}
      />

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
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    value={data.menu_name}
                    disabled
                  />
                  <div className="invalid-feedback">Please Enter a users</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Users
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    value={data.roles_name}
                    disabled
                  />
                  <div className="invalid-feedback">Please Enter a users</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Action
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter roles name"
                    value={data.action}
                    disabled
                  />
                  <div className="invalid-feedback">Please Enter a action</div>
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

export default PermissionDetailViews;
