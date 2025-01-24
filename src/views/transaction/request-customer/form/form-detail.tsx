import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import CircleLoading from "@/components/layouts/Loading/circle-loading";
import InfoApproval from "../../request-item/form/info-approval";

const RequestCustomerDetailViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState({});
  const [salesItems, setSalesItems]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setData(req.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!router.isReady) return;

    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle
        titlePage="Request Customer"
        subTitle={"Request Customer Detail ID :" + id}
      />
      <InfoApproval data={data} />

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
                        Masa Berlaku Perizinan Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter start date"
                        value={data.date_permit_valid_start_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a start date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Masa Berlaku Perizinan End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter end date"
                        value={data.date_permit_valid_end_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a end date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Certificate CDOB Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter start date"
                        value={data.date_certificate_cdob_start_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a start date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Certificate CDOB End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter end date"
                        value={data.date_certificate_cdob_end_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a end date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Apoteker Penanggung Jawab Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter start date"
                        value={data.date_permit_apoteker_start_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a start date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Apoteker Penanggung Jawab End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter end date"
                        value={data.date_permit_apoteker_end_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a end date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Ceritificate CDAKB Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter start date"
                        value={data.date_certificate_cdakb_start_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a start date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Ceritificate CDAKB End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter end date"
                        value={data.date_certificate_cdakb_end_date}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a end date
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nomor Perizinan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nomor"
                        value={data.permit_number}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a nomor
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nomor CDOB
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nomor"
                        value={data.cdob_number}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a nomor
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nomor Apoteker
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nomor"
                        value={data.apoteker_number}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a nomor
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nomor CDAKB
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nomor"
                        value={data.cdakb_number}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a nomor
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

        <div className="row">
          <div className="col-lg-12">
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

export default RequestCustomerDetailViews;
