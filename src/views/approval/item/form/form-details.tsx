import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import InfoApproval from "@/views/transaction/request-item/form/info-approval";
import dynamic from "next/dynamic";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import Message from "@/utility/message";
import { useSession } from "next-auth/react";
import FormModalKeteranganReject from "./modal/form-keterangan-reject";

const ApprovalItemDetailsViews = ({ base_url = "" }) => {
  const Select = dynamic(() => import("react-select"), { ssr: false });
  const classNameModal = "modal-reject";

  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState({});
  const [account, setAccount]: any = useState(null);
  const [accounts, setAccounts]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const session: any = useSession();

  const postData: any = {
    id: id,
    account: account,
  };

  const fetchData = async () => {
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setData(req.data);
      setAccount({ value: req.data.account, label: req.data.account_name });
    }
  };

  const fetchDataAccount = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL + "/data/account/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({
            value: item.id,
            label: item.account_code + "-" + item.account_name,
          });
        });

        setAccounts(val);
      }
    }
  };

  const handleSelectionAccountChange = (e: any) => {
    accounts.forEach((option: any) => {
      if (option.value === e.value) {
        setAccount(option);
      }
    });
  };

  const handleReject = async (e: any, remarks: any) => {
    setLoading(true);
    const post = {
        id: id,
        remarks: remarks,
    };
    const req: any = await ApiServices.submit(base_url, post, "/reject");
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
      router.push(base_url);
    } else {
      Message.info(req.message);
      setErrors({ message: req.message });
      setLoading(false);
    }
    setLoading(false);
  };

  const validation = (data: any): boolean => {
    if (data.account == null || Object.keys(data.account).length == 0) {
      setErrors({ message: "Account Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      postData.users = session.data.user.id;
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

    fetchDataAccount();
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle
        titlePage="Request Item"
        subTitle={"Request Item Detail ID :" + id}
      />
      <InfoApproval data={data} />

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
                        htmlFor="choices-publish-status-input"
                        className="form-label"
                      >
                        Account
                      </label>
                      <Select
                        defaultValue={account}
                        onChange={(e: any) => handleSelectionAccountChange(e)}
                        options={accounts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FormModalKeteranganReject
              className={classNameModal}
              handleReject={handleReject}
              error={errors}
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
                  Approve
                </button>
              )}
              &nbsp;
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <Link
                  href={"javascript:;"}
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={"." + classNameModal}
                >
                  Reject
                </Link>
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

export default ApprovalItemDetailsViews;
