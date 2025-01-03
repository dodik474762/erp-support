import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import InfoApproval from "./info-approval";

const RequestItemDetailsViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState({});

  const fetchData = async () => {
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      console.log(req.data);
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
        titlePage="Request Item"
        subTitle={"Request Item Detail ID :" + id}
      />
      <InfoApproval data={data} />

      <form
        id="createproduct-form"
        autoComplete="off"
        className="needs-validation"
        noValidate
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5>Detail Form</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter departemen"
                        disabled
                        value={data.departemen_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a departemen
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nama"
                        disabled
                        value={data.item_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a nama
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Keterangan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter keterangan"
                        value={data.remarks}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a keterangan
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a account
                      </div>
                    </div>
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

export default RequestItemDetailsViews;
