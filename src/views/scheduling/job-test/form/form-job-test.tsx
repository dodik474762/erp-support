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

const FormJobTestViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [namaJob, setNamaJob] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [job, setJob]: any = useState({});
  const [startDate, setStartDate]: any = useState("");
  const [endDate, setEndDate]: any = useState("");
  const [jobs, setJobs] = useState([]);
  const [dataTests, setDataTests] = useState([]);
  const [istSixTest, setIstSixTest] = useState(false);
  const [istNineTest, setIstNineTest] = useState(false);

  const dataCheckTests: any = useRef([]);
  const postData: any = {
    id: id,
    job: job,
    remarks: remarks,
    start_date: startDate,
    end_date: endDate,
    item_tests: dataCheckTests.current,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      if(req.data.type_ist_test == 6){
        setIstSixTest(true);
        setIstNineTest(false);
      }
      if(req.data.type_ist_test == 9){
        setIstNineTest(true);
        setIstSixTest(false);
      }
      setStartDate(
        moment(req.data.start_date.replace("T", " ").replace("Z", "")).format(
          "YYYY-MM-DD HH:mm"
        )
      );
      setEndDate(
        moment(req.data.end_date.replace("T", " ").replace("Z", "")).format(
          "YYYY-MM-DD HH:mm"
        )
      );
      setRemarks(req.data.remarks);
      setJob({
        value: req.data.job,
        label: req.data.nama_job,
      });

      /*test list */
      if (req.origin.data_test.length > 0) {
        setDataTests(req.origin.data_test);
        req.origin.data_test.forEach((item: any) => {
          if (item.is_active) {
            if (item.is_active == 1) {
              const index = dataCheckTests.current.findIndex(
                (itemV: any) => itemV.id == item.id
              );
              if (index == -1) {
                dataCheckTests.current.push(item);
              } else {
                dataCheckTests.current[index] = item;
              }
            }
          }
        });
      }
      /*test list */
    }
    setLoading(false);
  };

  const fethJobs = async () => {
    const req: any = await ApiServices.get("/data/job-vacancy", "/getAll");
    if (req.is_valid == true) {
      const result: any = [];
      req.data.forEach((option: any) => {
        result.push({ value: option.id, label: option.nama_job });
      });
      setJobs(result);
    }
  };

  const handleSelectionChange = (e: any) => {
    jobs.forEach((option: any) => {
      if (option.value === e.value) {
        setJob(option);
      }
    });
  };

  const handleCheckTest = (e: any, items: any) => {
    if (e.target.checked) {
      items.is_active = 1;
      dataCheckTests.current.push(items);
    } else {
      const index = dataCheckTests.current.findIndex(
        (item: any) => item.id == items.id
      );
      dataCheckTests.current.splice(index, 1);
    }

    dataTests.forEach((item: any) => {
      if (item.id == items.id) {
        item.is_active = e.target.checked ? 1 : 0;
      }
    });
    setDataTests([...dataTests]);
    console.log(dataCheckTests.current, e.target.checked);
  };

  const validation = (data: any): boolean => {
    if (data.start_date == "") {
      setErrors({ message: "Tanggal Mulai Harus Diisi" });
      return false;
    }
    if (data.end_date == "") {
      setErrors({ message: "Tanggal Selesai Harus Diisi" });
      return false;
    }

    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (
      data.job == null ||
      data.job == "" ||
      Object.keys(data.job).length === 0
    ) {
      setErrors({ message: "Job Vacancy Harus Diisi" });
      return false;
    }

    if((istSixTest == false && istNineTest == false) || (istSixTest == true && istNineTest == true)) {
      setErrors({ message: "Checklist Salah Satu Test IST 6 atau IST 9" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      postData.type_ist_test = istSixTest ? 6 : 9;
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

  const fetchDataTestActive = async () => {
    const req: any = await ApiServices.get(base_url, "/get-all-test-active");
    if (req.is_valid) {
      if (req.data != null) {
        setDataTests(req.data);
      }
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      fetchData();
    } else {
      fetchDataTestActive();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    fethJobs();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Scheduling" subTitle="Job Test Add" />

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
              <div className="card-header">
                <h5 className="card-title mb-0">Schedule Test</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Job Vacancy
                  </label>
                  <Select
                    defaultValue={job}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={jobs}
                  />
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Tanggal Mulai
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter tanggal mulai"
                    value={startDate}
                    onInput={(e: any) => setStartDate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a tanggal mulai
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Tanggal Selesai
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter tanggal selesai"
                    value={endDate}
                    onInput={(e: any) => setEndDate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a tanggal selesai
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Ist Test Version 6 Sub Test
                      </label>{" "}
                      <div>
                        <input type="checkbox" checked={istSixTest} onChange={(e: any) => setIstSixTest(e.target.checked)}/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Ist Test Version 9 Sub Test
                      </label>{" "}
                      <div>
                        <input type="checkbox" checked={istNineTest}  onChange={(e: any) => setIstNineTest(e.target.checked)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Test Active</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>No</th>
                        <th>Test</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTests.length > 0 &&
                        dataTests.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.judul}</td>
                              <td>
                                {item.is_active ? (
                                  <input
                                    type="checkbox"
                                    checked={item.is_active == 1 ? true : false}
                                    onChange={(e: any) =>
                                      handleCheckTest(e, item)
                                    }
                                  />
                                ) : (
                                  <input
                                    type="checkbox"
                                    onChange={(e: any) =>
                                      handleCheckTest(e, item)
                                    }
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
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

export default FormJobTestViews;
