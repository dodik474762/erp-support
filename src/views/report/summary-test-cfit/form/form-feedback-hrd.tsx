import ButtonLoading from "@/components/layouts/ButtonLoading";
import ApiServices from "@/services/api.services";
import Message from "@/utility/message";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FormFeedbackHrd = (props: any) => {
  const { base_url = "", applicant = 0, nik = 0, feedback = {} } = props;

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const [remarks, setRemarks] = useState(``);
  const [keputusan, setKeputusan] = useState({
    label: "DISARANKAN",
    value: "DISARANKAN",
  });
  const [errors, setErrors]: any = useState({});
  const [fileImage, setFileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listKeputusan, setListKeputusan]: any = useState([
    {
      label: "DISARANKAN",
      value: "DISARANKAN",
    },
    {
      label: "DISARANKAN DENGAN CATATAN",
      value: "DISARANKAN DENGAN CATATAN",
    },
    {
      label: "KURANG DISARANKAN",
      value: "KURANG DISARANKAN",
    },
    {
      label: "TIDAK DISARANKAN",
      value: "TIDAK DISARANKAN",
    },
  ]);
  const [dataKepribadian, setDataKepribadian]: any = useState([
    {
      id: "cep_emosi",
      text: "emosi",
      remarks: "",
    },
    {
      id: "cep_tujuan",
      text: "Tujuan",
      remarks: "",
    },
    {
      id: "cep_cara_nilai",
      text: "Cara menilai orang lain",
      remarks: "",
    },
    {
      id: "cep_cara_pengaruh",
      text: "Cara mempengaruhi orang lain",
      remarks: "",
    },
    {
      id: "cep_bagi_org",
      text: "Nilainya bagi organisasi",
      remarks: "",
    },
    {
      id: "cep_sikap_muncul",
      text: "Sikap yang sering muncul",
      remarks: "",
    },
    {
      id: "cep_bawah_tekanan",
      text: "Kondisi di bawah tekanan",
      remarks: "",
    },
    {
      id: "cep_merasa_takut",
      text: "Merasa takut bila",
      remarks: "",
    },
    {
      id: "cep_meningkatkan",
      text: "Cara meningkatkan efektivitas kerja",
      remarks: "",
    },
  ]);

  const postData: any = {
    id: "",
    applied: applicant,
    remarks: remarks,
    fileImage: fileImage,
    keputusan: keputusan.value,
    kepribadian: dataKepribadian,
  };

  const handleSelectionChange = (e: any, type = "") => {
    switch (type) {
      case "keputusan":
        listKeputusan.forEach((option: any) => {
          if (option.value === e.value) {
            setKeputusan(option);
          }
        });
        break;
    }
  };

  const handleChangeRemarks = (e: any) => {
    setErrors(null);
    const name = e.target.name;
    const found = dataKepribadian.find((item: any) => item.id == name);
    const dataVal = e.target.value;
    if (found) {
      found.remarks = dataVal;
    }

    setDataKepribadian([...dataKepribadian]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const file: any = document.getElementById("fileImage");
    const formData: any = new FormData();
    formData.append("data", JSON.stringify(postData));
    if (file) {
      if (file?.files[0]) {
        formData.append("fileImage", file?.files[0]);
      } else {
        setErrors({ message: "Screenshoot Hasil Test Harus Diisi" });
        setLoading(false);
        return;
      }
    } else {
      setErrors({ message: "Screenshoot Hasil Test Harus Diisi" });
      setLoading(false);
      return;
    }

    if (remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      setLoading(false);
      return;
    }

    for (let index = 0; index < dataKepribadian.length; index++) {
      const element = dataKepribadian[index];
      if (element.remarks == "") {
        setErrors({ message: element.text + " Remarks Harus Diisi" });
        setLoading(false);
        return;
      }
    }

    const req: any = await ApiServices.submitMultiForm(
      base_url,
      formData,
      "/save-feedback-hrd"
    );
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
      window.location.href = base_url + "/document/" + nik + "/" + applicant;
    } else {
      Message.info(req.message);
      setErrors({ message: req.message });
    }
    setLoading(false);
  };

  const handleCancel = async (e: any) => {
    e.preventDefault();
    Message.question("Apa anda yakin membatalkan data ini?", async () => {
      setLoading(true);


      const req: any = await ApiServices.submit(
        base_url,
        {
          id: applicant,
        },
        "/cancel-feedback-hrd"
      );
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses Batal");
        window.location.reload();
      } else {
        Message.info(req.message);
        setErrors({ message: req.message });
      }
      setLoading(false);
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {errors == null ? null : (
            <>
              <div className="alert alert-danger mb-xl-0" role="alert">
                {errors.message} <strong> Harus Diisi! </strong>
              </div>
              <br />
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="fileImage">
              Upload Screenshoot Grafik Hasil Test Personal Describe format (png, jpeg, jpg)
            </label>

            {Object.keys(feedback).length > 0 ? (
              <Link
                target="_blank"
                href={
                  process.env.BASE_URL_SERVER +
                  "/" +
                  feedback.path_file_test_desc +
                  "/" +
                  feedback.file_test_desc
                }
              >
                {feedback.file_test_desc}
              </Link>
            ) : (
              <input
                type="file"
                className="form-control"
                id="fileImage"
                placeholder="Enter image"
                onChange={(e: any) => setFileImage(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="product-title-input">
              Keputusan Hasil Test
            </label>

            {Object.keys(feedback).length > 0 ? (
              <p>
                <label htmlFor="" className="text-info">
                  {feedback.result}
                </label>
              </p>
            ) : (
              <Select
                defaultValue={keputusan}
                name="keputusan"
                onChange={(e: any) => handleSelectionChange(e, "keputusan")}
                options={listKeputusan}
              />
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label" htmlFor="product-title-input">
              Keterangan Hasil Test (Remarks)
            </label>
            {Object.keys(feedback).length > 0 ? (
              <p>
                <label htmlFor="" className="text-info">
                  {feedback.remarks}
                </label>
              </p>
            ) : (
              <>
                <textarea
                  name="keputusan"
                  id="keputusan"
                  className="form-control"
                  onInput={(e: any) => setRemarks(e.target.value)}
                ></textarea>
                <div className="invalid-feedback">
                  Please Enter a keterangan hasil test
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-nowrap mb-0">
              <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                  <th style={{ width: "5%" }}>No.</th>
                  <th>Kepribadian</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(feedback).length > 0 ? (
                  <>
                    {feedback.candidates_describes.map(
                      (item: any, index: number) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.remarks}</td>
                            </tr>
                          </>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    {dataKepribadian.map((item: any, index: number) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.text}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                id={item.id}
                                name={item.id}
                                placeholder="Enter keterangan"
                                onInput={handleChangeRemarks}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="text-end mb-3">
            {loading ? (
              <ButtonLoading message="Loading Proses Saving ...." />
            ) : (
              <>
                {Object.keys(feedback).length > 0 ? (
                  <button
                    type="submit"
                    className="btn btn-danger w-sm"
                    onClick={(e: any) => handleCancel(e)}
                    onSubmit={(e: any) => handleCancel(e)}
                  >
                    Batalkan Hasil Test
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    onClick={(e: any) => handleSubmit(e)}
                    onSubmit={(e: any) => handleSubmit(e)}
                  >
                    Submit Hasil Test
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormFeedbackHrd;
