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

const FormCandidateViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;

  const [namaLengkap, setNamaLengkap] = useState(``);
  const [nik, setNik] = useState(``);
  const [contact, setContact] = useState(``);
  const [email, setEmail] = useState(``);
  const [alamat, setAlamat] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    nama_lengkap: namaLengkap,
    nik: nik,
    contact: contact,
    email: email,
    alamat: alamat,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setNamaLengkap(req.data.nama_lengkap);
      setContact(req.data.contact);
      setEmail(req.data.email);
      setAlamat(req.data.alamat);
      setNik(req.data.nik);
    }
    setLoading(false);
  };

  const validation = (data: any): boolean => {
    if (data.nama_lengkap == "") {
      setErrors({ message: "Nama Lengkap Harus Diisi" });
      return false;
    }

    if (data.nik == "") {
      setErrors({ message: "Nik Harus Diisi" });
      return false;
    }
    
    if (data.contact == "") {
      setErrors({ message: "Contact Harus Diisi" });
      return false;
    }
    
    if (data.email == "") {
      setErrors({ message: "Email Harus Diisi" });
      return false;
    }
    
    if (data.alamat == "") {
      setErrors({ message: "Alamat Harus Diisi" });
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
      console.log(req);
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
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Form Candidate" />

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
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama lengkap"
                    value={namaLengkap}
                    onInput={(e: any) => setNamaLengkap(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a nama lengkap
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    NIK
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nik"
                    value={nik}
                    onInput={(e: any) => setNik(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a nik
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Contact
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter contact"
                    value={contact}
                    onInput={(e: any) => setContact(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a contact
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter email"
                    value={email}
                    onInput={(e: any) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a email
                  </div>
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
                    value={alamat}
                    onInput={(e: any) => setAlamat(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a alamat
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

export default FormCandidateViews;
