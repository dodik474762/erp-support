import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import CircleLoading from "@/components/layouts/Loading/circle-loading";
import InfoApproval from "@/views/transaction/request-item/form/info-approval";
import FormModalKeteranganReject from "./modal/form-keterangan-reject";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useSession } from "next-auth/react";

const ApprovalCustomerDetailViews = ({ base_url = "" }) => {
  const router = useRouter();
  const session: any = useSession();
  const id = router.query.id;

  const [data, setData]: any = useState({});
  const [salesItems, setSalesItems]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [status, setStatus]: any = useState(``);

  const classNameModal = "modal-reject";

  const postData: any = {
    id: id,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setStatus(req.data.status);
      setData(req.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!router.isReady) return;

    fetchData();
  }, [router.isReady]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
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
  };

  return (
    <>
      <PageTitle
        titlePage="Approval Request Customer"
        subTitle={"Approval Request Customer Detail ID :" + id}
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

      <div className="row">
        <div className="col-md-12 text-center">
          {loading == true ? <CircleLoading /> : null}
        </div>
      </div>

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
                        Subsidiary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter subsidiary"
                        disabled
                        value={data.subsidiary_type}
                      />
                      <div className="invalid-feedback">
                        Please Enter a subsidiary
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
                        value={data.customer_name}
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
                        Customer Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter category"
                        disabled
                        value={data.customer_category_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a customer category
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Alamat
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter alamat"
                        disabled
                        value={data.address}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Alamat
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter email"
                        disabled
                        value={data.email}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Email
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Phone"
                        disabled
                        value={data.phone}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Phone
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Customer Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter type"
                        disabled
                        value={data.customer_type}
                      />
                      <div className="invalid-feedback">
                        Please Enter a type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        PIC Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter pic name"
                        disabled
                        value={data.pic_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a pic name
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        PIC Contact
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter pic contact"
                        disabled
                        value={data.pic_contact}
                      />
                      <div className="invalid-feedback">
                        Please Enter a pic contact
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        PIC Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter pic contact"
                        disabled
                        value={data.pic_title}
                      />
                      <div className="invalid-feedback">
                        Please Enter a pic title
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">ERP Data</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Customer ERP Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter customer erp id"
                    value={data.customer_erp_id}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a customer erp id
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Customer ERP Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter customer erp code"
                    value={data.customer_erp_code}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a customer erp code
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Customer ERP Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter item customer name"
                    value={data.customer_erp_name}
                    disabled
                  />
                  <div className="invalid-feedback">
                    Please Enter a item customer name
                  </div>
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

        <div className="row">
          <div className="col-lg-8">
            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <>
                  {status == "COMPLETED" ? null : (
                    <button
                      type="submit"
                      className="btn btn-success w-sm"
                      onClick={(e: any) => handleSubmit(e)}
                      onSubmit={(e: any) => handleSubmit(e)}
                    >
                      Approve
                    </button>
                  )}
                </>
              )}
              &nbsp;
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <>
                  {status == "COMPLETED" ? null : (
                    <Link
                      href={"javascript:;"}
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={"." + classNameModal}
                    >
                      Reject
                    </Link>
                  )}
                </>
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

export default ApprovalCustomerDetailViews;
