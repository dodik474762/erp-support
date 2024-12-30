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
import ListCandidateSubTestViews from "../list/list-candidate-subtest";
import ListCandidateQuestionSubTestViews from "../list/list-candidate-questions";

const FormDetailCandidateTestViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [judul, setJudul] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [jobName, setJobName] = useState(``);
  const [status, setStatus] = useState(``);
  const [codeTest, setCodeTest] = useState(``);
  const [candidateName, setCandidateName] = useState(``);
  const [dateAttandance, setDateAttandance] = useState(``);
  const [category, setCategory]: any = useState({});
  const [categorys, setCategorys] = useState([]);
  const [subTests, setSubTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    judul: judul,
    category: category,
    remarks: remarks,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setJudul(req.data.judul);
      setRemarks(req.data.remarks);
      setJobName(req.data.nama_job);
      setCategory({
        value: req.data.category,
        label: req.data.category_name,
      });
      setCodeTest(req.data.code);
      setCandidateName(req.data.nama_candidate);
      setDateAttandance(req.data.date_schedule);
      setStatus(req.data.status);

      fetchDataSubTest(req.data.id);
    }
    setLoading(false);
  };

  const fetchDataSubTest = async (candidate_test_id: number) => {
    setLoading(true);
    const req: any = await ApiServices.get(
      base_url,
      "/get-all-subtest?candidate_test_id=" + candidate_test_id
    );
    if (req.is_valid == true) {
      const result: any = [];
      req.data.map((item: any) => {
        result.push(item);
      });

      setSubTests(result);
    }
    setLoading(false);
  };

  const fetchDataCategory = async () => {
    const req = await fetch(
      process.env.API_BASE_URL +
        "/master/dictionary/getAll?context=TEST_CATEGORY"
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const result: any = [];
        res.data.map((item: any) => {
          result.push({ value: item.term_id, label: item.keterangan });
        });

        setCategorys(result);
      }
    }
  };

  const fetchQuestionsList = async (subtest_id: number) => {
    const req: any = await ApiServices.get(
      base_url,
      "/get-questions?subtest_id=" + subtest_id
    );
    if (req.is_valid == true) {
      const result: any = [];
      req.data.map((item: any) => {
        result.push(item);
      });
      setQuestions(result);
    }
  };

  const handleSelectionChange = (e: any) => {
    categorys.forEach((option: any) => {
      if (option.value === e.value) {
        setCategory(option);
      }
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchDataCategory();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Scheduling" subTitle="Candidate Test Detail" />

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
              <div className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">
                    Category Test [{codeTest}] / {jobName} / {candidateName}
                  </h5>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Judul Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter judul"
                    value={judul}
                    disabled
                    onInput={(e: any) => setJudul(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a judul</div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter pekerjaan"
                    value={jobName}
                    disabled
                    onInput={(e: any) => setJobName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a pekerjaan
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Kategori
                  </label>
                  <Select
                    defaultValue={category}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={categorys}
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
                    disabled
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
                    Tanggal Konfirmasi Kehadiran
                  </label>
                  {dateAttandance && (
                    <input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      disabled
                      placeholder="Enter konfirmasi kehadiran"
                      value={moment(dateAttandance)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD")}
                      onInput={(e: any) => setDateAttandance(e.target.value)}
                    />
                  )}
                  <div className="invalid-feedback">
                    Please Enter a konfirmasi kehadiran
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter status"
                    value={status}
                    disabled
                    onInput={(e: any) => setStatus(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a status</div>
                </div>
              </div>
            </div>

            <ListCandidateSubTestViews base_url={base_url} data={subTests} fetchQuestionsList={fetchQuestionsList}/>
            <ListCandidateQuestionSubTestViews base_url={base_url} data={questions} />
            <div className="text-end mb-3">
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

export default FormDetailCandidateTestViews;
