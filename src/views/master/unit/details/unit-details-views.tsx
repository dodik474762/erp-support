import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";

const UnitDetailsViews = ({
  base_url = ""
}) => {
  const router = useRouter();
  const id = router.query.id;

  const [name, setName] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const req = await fetch(
      process.env.API_BASE_URL + base_url+"/getDetail?id=" + id
    );
    const res = await req.json();
    if (res) {
      setName(res.data.name);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Master" subTitle="Unit Details" />

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
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter name"
                    value={name}
                    disabled
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a name
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

export default UnitDetailsViews;
