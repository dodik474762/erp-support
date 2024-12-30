import ButtonLoading from "@/components/layouts/ButtonLoading";
import PageTitle from "@/components/layouts/PageTitle";
import ApiServices from "@/services/api.services";
import { genderType, typeStudy } from "@/utility/datastatic";
import Message from "@/utility/message";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CandidateBiodata = (props: any) => {
  const { base_url, job, job_test_schedule } = props;
  const [errors, setErrors]: any = useState({});
  const [name, setName]: any = useState("");
  const [dateBorn, setDateBorn]: any = useState("");
  const [nik, setNik]: any = useState("");
  const [alamat, setalamat]: any = useState("");
  const [contact, setContact]: any = useState("");
  const [email, setEmail]: any = useState("");
  const [tempatLahir, setTempatLahir]: any = useState("");
  const [lastStudyName, setLastStudyName]: any = useState("");
  const [gender, setGender]: any = useState({
    value: "Laki-Laki",
    label: "Laki-Laki",
  });
  const [genders, setGenders]: any = useState(genderType);
  const [lastStudy, setLastStudy]: any = useState({
    value: "SMA IPA",
    label: "SMA IPA",
  });
  const [lastStudys, setLastStudys]: any = useState(typeStudy);
  const [fileImage, setFileImage] = useState(null);

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [loading, setLoading] = useState(false);
  const [isCompleteBio, setIsCompleteBio] = useState(false);

  const handleSelectionChange = (e: any, type = "") => {
    switch (type) {
      case "gender":
        genders.forEach((option: any) => {
          if (option.value === e.value) {
            setGender(option);
          }
        });
      case "last_study":
        lastStudys.forEach((option: any) => {
          if (option.value === e.value) {
            setLastStudy(option);
          }
        });
        break;
    }
  };

  const postData: any = {
    id: "",
    nik: nik,
    alamat: alamat,
    nama_lengkap: name,
    contact: contact,
    email: email,
    job_id: job,
    job_test_schedule_id: job_test_schedule,
    gender: gender.value,
    date_born: dateBorn,
    last_study: lastStudy.value,
    last_study_remarks: lastStudyName,
    place_born: tempatLahir,
  };

  const validation = (data: any): boolean => {
    if (data.name == "") {
      setErrors({ message: "Nama Lengkap Harus Diisi" });
      return false;
    }

    if (data.nik == "") {
      setErrors({ message: "NIK Harus Diisi" });
      return false;
    }

    if (data.contact == "") {
      setErrors({ message: "Contact Harus Diisi" });
      return false;
    }

    if (data.alamat == "") {
      setErrors({ message: "Alamat Harus Diisi" });
      return false;
    }

    if (data.email == "") {
      setErrors({ message: "Email Harus Diisi" });
      return false;
    }

    if (data.place_born == "") {
      setErrors({ message: "Tempat Lahir Harus Diisi" });
      return false;
    }

    if (data.last_study_remarks == "") {
      setErrors({ message: "Nama Jurusan Pendidikan Terakhir Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      const file: any = document.getElementById("fileImage");
      const formData: any = new FormData();
      formData.append("data", JSON.stringify(postData));
      if (file) {
        if (file?.files[0]) {
          formData.append("fileImage", file?.files[0]);
        } else {
          setErrors({ message: "Pas Foto Harus Diisi" });
          setLoading(false);
          return;
        }
      } else {
        setErrors({ message: "Pas Foto Harus Diisi" });
        setLoading(false);
        return;
      }

      const req: any = await ApiServices.submitMultiForm(
        base_url,
        formData,
        "/save-candidate"
      );
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses");
        localStorage.setItem("candidate-bio-complete", "true");
        localStorage.setItem("nik", postData.nik);
        localStorage.setItem("name", postData.nama_lengkap);
        localStorage.setItem("contact", postData.contact);
        localStorage.setItem("email", postData.email);
        localStorage.setItem("alamat", postData.alamat);
        localStorage.setItem(
          "candidate-id",
          req.data.id + "-" + job + "-" + job_test_schedule
        );

        localStorage.setItem("candidateid", req.data.id);
        const linkTest = `/recrutment/candidate-test?job=${job}&job_test_schedule=${job_test_schedule}&confirm=no&candidate=${req.data.id}&candidate_applied=${req.origin.applied.id}&readytest=1`;
        localStorage.setItem("link-test", linkTest);

        setIsCompleteBio(true);
        window.location.href = linkTest;
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
    if (!isCompleteBio) {
      const complete = localStorage.getItem("candidate-bio-complete");
      if (complete == "true") {
        const complete = localStorage.getItem("candidate-bio-complete");
        const candidateid = localStorage.getItem("candidateid");
        const candidate_test_storage: any = localStorage.getItem('candidate-id');
        const dataTestCandidate = candidate_test_storage.split("-");
        const jobTestLocal = dataTestCandidate[dataTestCandidate.length - 1];
        if(jobTestLocal == job_test_schedule){
          setIsCompleteBio(true);
          window.location.href = String(localStorage.getItem("link-test"));
        }
      }
    } else {
      setEmail(localStorage.getItem("email"));
      setName(localStorage.getItem("name"));
      setNik(localStorage.getItem("nik"));
      setContact(localStorage.getItem("contact"));
      setalamat(localStorage.getItem("alamat"));
    }
  }, [isCompleteBio]);

  return (
    <>
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
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    NIK
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nik"
                    value={nik}
                    onInput={(e: any) => setNik(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nik</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama lengkap"
                    value={name}
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a nama lengkap
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter tempat lahir"
                    value={tempatLahir}
                    onInput={(e: any) => setTempatLahir(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a tempat lahir
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter tanggal lahir"
                    value={dateBorn}
                    onInput={(e: any) => setDateBorn(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a tanggal lahir
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Jenis Kelamin
                  </label>
                  <Select
                    defaultValue={gender}
                    name="gender"
                    onChange={(e: any) => handleSelectionChange(e, "gender")}
                    options={genders}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
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
                    onInput={(e: any) => setalamat(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a alamat</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Contact HP / WA
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter contact hp / wa"
                    value={contact}
                    onInput={(e: any) => setContact(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a contact hp / wa
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
                  <div className="invalid-feedback">Please Enter a email</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="fileImage">
                    Pas Foto Candidate
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    id="fileImage"
                    placeholder="Enter image"
                    onChange={(e: any) => setFileImage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-publish-status-input"
                      className="form-label"
                    >
                      Pendidikan Terakhir
                    </label>
                    <Select
                      defaultValue={lastStudy}
                      name="last_study"
                      onChange={(e: any) =>
                        handleSelectionChange(e, "last_study")
                      }
                      options={lastStudys}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nama Jurusan Pendidikan Terakhir
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama pendidikan terakhir"
                    value={lastStudyName}
                    onInput={(e: any) => setLastStudyName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a nama pendidikan terakhir
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : isCompleteBio ? null : (
                <button
                  type="submit"
                  className="btn btn-success w-sm"
                  onClick={(e: any) => handleSubmit(e)}
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  Confirm Test
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CandidateBiodata;
