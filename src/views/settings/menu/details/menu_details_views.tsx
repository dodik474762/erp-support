import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const MenuDetailsViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
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
      <PageTitle titlePage="Settings" subTitle={"Menu Detail ID :" + id} />

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
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter name"
                    value={data.parent_name}
                    disabled
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
                    value={data.name}
                    disabled
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
                    value={data.path}
                    placeholder="Enter path url"
                    disabled
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
                    value={data.icon}
                    placeholder="Enter icon menu"
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a icon menu
                  </div>
                </div>
                <div className="mb-3">
                  {data.routing == true ? (
                    <input
                    disabled
                      type="checkbox"
                      className=""
                      id="product-title-input"
                      checked
                    />
                  ) : (
                    <input
                    disabled
                      type="checkbox"
                      className=""
                      id="product-title-input"
                    />
                  )}{" "}
                  <label className="form-label" htmlFor="product-title-input">
                    Routing
                  </label>
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

export default MenuDetailsViews;
