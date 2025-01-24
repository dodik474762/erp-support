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
import { useSession } from "next-auth/react";
import CircleLoading from "@/components/layouts/Loading/circle-loading";

const FormRequestCustomerViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id ?? "";
  const session: any = useSession();

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [name, setName] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [subsidiarys, setSubsidiarys]: any = useState([]);
  const [subsidiary, setSubsidiary]: any = useState(null);
  const [categorys, setCategorys]: any = useState([]);
  const [category, setCategory]: any = useState(null);
  const [status, setStatus]: any = useState(``);
  const [address, setAddress]: any = useState(null);
  const [email, setEmail]: any = useState(null);
  const [phone, setPhone]: any = useState(null);
  const [types, setTypes]: any = useState([
    {
      value: "COMPANY",
      label: "COMPANY",
    },
    {
      value: "INDIVIDUAL",
      label: "INDIVIDUAL",
    },
  ]);
  const [type, setType]: any = useState({
    value: "COMPANY",
    label: "COMPANY",
  });
  const [picName, setPicName] = useState(``);
  const [picContact, setPicContact] = useState(``);
  const [picTitle, setPicTitle] = useState(``);
  const [datePermitStartDate, setDatePermitStartDate]: any = useState(null);
  const [datePermitEndDate, setDatePermitEndDate]: any = useState(null);
  const [dateCertificateCdobStartDate, setDateCertificateCdobStartDate]: any =
    useState(null);
  const [dateCertificateCdobEndDate, setDateCertificateCdobEndDate]: any =
    useState(null);
  const [dateApotekerStartDate, setDateApotekerStartDate]: any = useState(null);
  const [dateApotekerEndDate, setDateApotekerEndDate]: any = useState(null);
  const [dateCertificateCdakbStartDate, setDateCertificateCdakbStartDate]: any =
    useState(null);
  const [dateCertificateCdakbEndDate, setDateCertificateCdakbEndDate]: any =
    useState(null);
  const [permitNumber, setPermitNumber]: any = useState(null);
  const [cdobNumber, setCdobNumber]: any = useState(null);
  const [apotekerNumber, setApotekerNumber]: any = useState(null);
  const [cdakbNumber, setCdakbNumber]: any = useState(null);
  const [erpId, setErpId] = useState(``);
  const [erpCode, setErpCode] = useState(``);
  const [erpName, setErpName] = useState(``);

  const postData: any = {
    id: id,
    subsidiary: subsidiary,
    category: category,
    customer_name: name,
    remarks: remarks,
    address: address,
    email: email,
    phone: phone,
    type: type,
    picName: picName,
    picContact: picContact,
    picTitle: picTitle,
    datePermitStartDate: datePermitStartDate,
    datePermitEndDate: datePermitEndDate,
    dateCertificateCdobStartDate: dateCertificateCdobStartDate,
    dateCertificateCdobEndDate: dateCertificateCdobEndDate,
    dateApotekerStartDate: dateApotekerStartDate,
    dateApotekerEndDate: dateApotekerEndDate,
    dateCertificateCdakbStartDate: dateCertificateCdakbStartDate,
    dateCertificateCdakbEndDate: dateCertificateCdakbEndDate,
    permitNumber: permitNumber,
    cdobNumber: cdobNumber,
    apotekerNumber: apotekerNumber,
    cdakbNumber: cdakbNumber,
    erpId: erpId,
    erpCode: erpCode,
    erpName: erpName,
    status: status,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setErpId(req.data.item_erp_id);
      setErpCode(req.data.item_erp_code);
      setErpName(req.data.item_erp_name);
      setRemarks(req.data.remarks);
      setAddress(req.data.address);
      setEmail(req.data.email);
      setPhone(req.data.phone);
      setName(req.data.customer_name);
      setSubsidiary({
        value: req.data.subsidiary,
        label: req.data.subsidiary_type,
      });
      setCategory({
        value: req.data.customer_category,
        label: req.data.customer_category_name,
      });
      setType({
        value: req.data.customer_type,
        label: req.data.customer_type,
      });
      setPicName(req.data.pic_name);
      setPicContact(req.data.pic_contact);
      setPicTitle(req.data.pic_title);
      setDatePermitStartDate(req.data.date_permit_valid_start_date);
      setDatePermitEndDate(req.data.date_permit_valid_end_date);
      setDateCertificateCdobStartDate(
        req.data.date_certificate_cdob_start_date
      );
      setDateCertificateCdobEndDate(req.data.date_certificate_cdob_end_date);
      setDateApotekerStartDate(req.data.date_permit_apoteker_start_date);
      setDateApotekerEndDate(req.data.date_permit_apoteker_end_date);
      setDateCertificateCdakbStartDate(
        req.data.date_certificate_cdakb_start_date
      );
      setDateCertificateCdakbEndDate(req.data.date_certificate_cdakb_end_date);
      setPermitNumber(req.data.permit_number);
      setCdobNumber(req.data.cdob_number);
      setApotekerNumber(req.data.apoteker_number);
      setCdakbNumber(req.data.cdakb_number);
      setStatus(req.data.status);
    }
    setLoading(false);
  };

  const fetchDataSubsidiarys = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/subsidiary/getAll",
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
          val.push({ value: item.id, label: item.type });
        });

        setSubsidiarys(val);
      }
    }
  };

  const fetchDataCategory = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/customer-category/getAll",
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
          val.push({ value: item.id, label: item.type });
        });

        setCategorys(val);
      }
    }
  };

  const handleSelectionChange = (e: any, type: string) => {
    if (type == "subsidiary") {
      subsidiarys.forEach((option: any) => {
        if (option.value === e.value) {
          setSubsidiary(option);
        }
      });
    }
    if (type == "category") {
      categorys.forEach((option: any) => {
        if (option.value === e.value) {
          setCategory(option);
        }
      });
    }
    if (type == "type") {
      types.forEach((option: any) => {
        if (option.value === e.value) {
          setType(option);
        }
      });
    }
  };

  const validation = (data: any): boolean => {
    if (data.name == "") {
      setErrors({ message: "Nama Harus Diisi" });
      return false;
    }

    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (data.subsidiary == null || Object.keys(data.subsidiary).length == 0) {
      setErrors({ message: "Subsidiary Harus Diisi" });
      return false;
    }

    if (data.status == "COMPLETED") {
      if (data.erpId == "") {
        setErrors({ message: "ERP ID Harus Diisi" });
        return false;
      }
      if (data.erpCode == "") {
        setErrors({ message: "ERP Code Harus Diisi" });
        return false;
      }
      if (data.erpName == "") {
        setErrors({ message: "ERP Name Harus Diisi" });
        return false;
      }
    }
    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      postData.users = session.data.user.id;
      // console.log(postData);
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
    fetchDataCategory();
    fetchDataSubsidiarys();
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Form Request" subTitle="Request Customer Add" />

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
                <h5 className="card-title mb-0">Customer</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Subsidiary
                  </label>
                  <Select
                    defaultValue={subsidiary}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "subsidiary")
                    }
                    options={subsidiarys}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama"
                    value={name}
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nama</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Customer Category
                  </label>
                  <Select
                    defaultValue={category}
                    onChange={(e: any) => handleSelectionChange(e, "category")}
                    options={categorys}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter alamat"
                    value={address}
                    onInput={(e: any) => setAddress(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a alamat</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter email"
                    value={email}
                    onInput={(e: any) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a email</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter phone"
                    value={phone}
                    onInput={(e: any) => setPhone(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a phone</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Customer Type
                  </label>
                  <Select
                    defaultValue={type}
                    onChange={(e: any) => handleSelectionChange(e, "type")}
                    options={types}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    PIC Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter pic name"
                    value={picName}
                    onInput={(e: any) => setPicName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a pic name
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    PIC Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter pic contact"
                    value={picContact}
                    onInput={(e: any) => setPicContact(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a pic contact
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    PIC Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter pic title"
                    value={picTitle}
                    onInput={(e: any) => setPicTitle(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a pic title
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Masa Berlaku Perizinan Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter start date"
                    value={datePermitStartDate}
                    onInput={(e: any) => setDatePermitStartDate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a start date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Masa Berlaku Perizinan End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter end date"
                    value={datePermitEndDate}
                    onInput={(e: any) => setDatePermitEndDate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a end date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Certificate CDOB Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter start date"
                    value={dateCertificateCdobStartDate}
                    onInput={(e: any) =>
                      setDateCertificateCdobStartDate(e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Please Enter a start date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Certificate CDOB End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter end date"
                    value={dateCertificateCdobEndDate}
                    onInput={(e: any) =>
                      setDateCertificateCdobEndDate(e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Please Enter a end date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Apoteker Penanggung Jawab Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter start date"
                    value={dateApotekerStartDate}
                    onInput={(e: any) =>
                      setDateApotekerStartDate(e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Please Enter a start date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Apoteker Penanggung Jawab End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter end date"
                    value={dateApotekerEndDate}
                    onInput={(e: any) => setDateApotekerEndDate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a end date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Ceritificate CDAKB Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter start date"
                    value={dateCertificateCdakbStartDate}
                    onInput={(e: any) =>
                      setDateCertificateCdakbStartDate(e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Please Enter a start date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Ceritificate CDAKB End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter end date"
                    value={dateCertificateCdakbEndDate}
                    onInput={(e: any) =>
                      setDateCertificateCdakbEndDate(e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Please Enter a end date
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nomor Perizinan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nomor"
                    value={permitNumber}
                    onInput={(e: any) => setPermitNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nomor</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nomor CDOB
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nomor"
                    value={cdobNumber}
                    onInput={(e: any) => setCdobNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nomor</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nomor Apoteker
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nomor"
                    value={apotekerNumber}
                    onInput={(e: any) => setApotekerNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nomor</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nomor CDAKB
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nomor"
                    value={cdakbNumber}
                    onInput={(e: any) => setCdakbNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nomor</div>
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

            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <>
                  {status == "COMPLETED" && erpId == "" ? (
                    <button
                      type="submit"
                      className="btn btn-success w-sm"
                      onClick={(e: any) => handleSubmit(e)}
                      onSubmit={(e: any) => handleSubmit(e)}
                    >
                      Update ERP ID
                    </button>
                  ) : (
                    <>
                      {status == "COMPLETED" ? null : (
                        <button
                          type="submit"
                          className="btn btn-success w-sm"
                          onClick={(e: any) => handleSubmit(e)}
                          onSubmit={(e: any) => handleSubmit(e)}
                        >
                          Submit
                        </button>
                      )}
                    </>
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

          <div className="col-lg-4">
            {status == "COMPLETED" ? (
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
                      value={erpId}
                      onInput={(e: any) => setErpId(e.target.value)}
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
                      value={erpCode}
                      onInput={(e: any) => setErpCode(e.target.value)}
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
                      value={erpName}
                      onInput={(e: any) => setErpName(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please Enter a item customer name
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRequestCustomerViews;
