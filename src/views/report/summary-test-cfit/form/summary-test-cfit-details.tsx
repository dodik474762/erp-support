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
import Image from "next/image";
import moment from "moment-timezone";
import SummaryTableSubListCfit from "./summary-table-sub-list-cfit";
import DataApplicant from "./data-applicant";
import DataJobVacancyCandidate from "./data-job-vacancy-candidate";
import DetailModalAnswer from "./modal/detail-answer";
import Exported from "@/utility/exported";
import DetailModalImageTest from "./modal/detail-image-test";
import SummaryTableDescribeTestList from "./summary-table-describe-test";
import SummaryTableSubListCreplin from "./summary-test-creplin";
import FormFeedbackHrd from "./form-feedback-hrd";
import FormSettingRetest from "./modal/form-setting-retest";

const FormSummaryTestCfitDetailViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const classNameModal = "modal-answer";
  const classNamePictureModal = "modal-picture";
  const classNameSettingCandidateRetestModal = "modal-setting-candidate-retest";

  const [namaLengkap, setNamaLengkap] = useState(``);
  const [nik, setNik] = useState(``);
  const [jobName, setJobName] = useState(``);
  const [dateApplied, setDateApplied] = useState(``);
  const [subTestCfit, setSubTestCfit] = useState([]);
  const [subTestCreplin, setSubTestCreplin] = useState([]);
  const [subTestIst, setSubTestIst] = useState([]);
  const [describeTest, setDescribeTest] = useState([]);
  const [testCfit, setTestCfit]: any = useState({});
  const [applicants, setApplicants] = useState([]);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [poin, setPoin] = useState(0);
  const [iqValue, setIqValue] = useState(0);
  const [dataAnswers, setDataAnswers] = useState({});
  const [pictures, setPictures] = useState([]);
  const [fotoCandidate, setPhotosCandidate] = useState("");
  const [summaryCreplins, setSummaryCreplins] = useState([]);
  const [candidateFeedback, setCandidateFeedback] = useState({});
  const [catDescribeTest, setCatDescribeTest] = useState({
    persegi: { most: 0, least: 0 },
    bintang: { most: 0, least: 0 },
    segitiga: { most: 0, least: 0 },
    "huruf-z": { most: 0, least: 0 },
    "huruf-n": { most: 0, least: 0 },
  });
  const [catDescribeTests, setCatDescribeTests]: any = useState([
    "persegi",
    "bintang",
    "segitiga",
    "huruf-z",
    "huruf-n",
  ]);

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      if (req.origin.candidate_feedback) {
        setCandidateFeedback(req.origin.candidate_feedback);
      }
      if (req.data.pas_foto) {
        const pasFotoLink =
          process.env.BASE_URL_SERVER +
          "/" +
          req.data.path_file +
          "/" +
          req.data.pas_foto;
        setPhotosCandidate(pasFotoLink);
      } else {
        setPhotosCandidate("");
      }
      setNamaLengkap(req.data.nama_candidate);
      setNik(req.data.nik);
      setJobName(req.data.nama_job);
      setDateApplied(
        moment(req.data.date_applied)
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm")
      );
      const resultSubListCfit: any = [];
      const resultSubListCreplin: any = [];
      const resultSubListIst: any = [];
      const resultPictures: any = [];

      let totalPoin = 0;
      if (req.origin.test_cfit) {
        req.origin.test_cfit.subtest.map((elm: any) => {
          let itemPoin = 0;
          const tempQuestions: any = [];
          const answersResult: any = [];
          elm.answers.map((item: any) => {
            const foreignKey = item.questions_item;
            if (!tempQuestions.includes(foreignKey)) {
              itemPoin += Number(item.poin);
              tempQuestions.push(foreignKey);
              answersResult.push(item);
            }
          });

          elm.answers = answersResult;

          elm.pictures.map((pict: any) => {
            pict.chapter = elm.remarks;
            resultPictures.push(pict);
          });
          totalPoin += itemPoin;
          resultSubListCfit.push(elm);
        });
      }

      let totalPoinIst = 0;
      if (req.origin.test_ist) {
        req.origin.test_ist.subtest.map((elm: any) => {
          let itemPoin = 0;
          const answersResult: any = [];
          const tempQuestions: any = [];
          elm.answers.map((item: any) => {
            const foreignKey = item.questions_item;
            if (!tempQuestions.includes(foreignKey)) {
              itemPoin += Number(item.poin);
              tempQuestions.push(foreignKey);
              answersResult.push(item);
            }
          });

          elm.answers = answersResult;

          elm.pictures.map((pict: any) => {
            pict.chapter = elm.remarks;
            resultPictures.push(pict);
          });
          totalPoinIst += itemPoin;
          resultSubListIst.push(elm);
        });
      }

      const resultSubListDescribe: any = [];
      const summaryPoinDescribe: any = {
        persegi: { most: 0, least: 0 },
        bintang: { most: 0, least: 0 },
        segitiga: { most: 0, least: 0 },
        "huruf-z": { most: 0, least: 0 },
        "huruf-n": { most: 0, least: 0 },
      };
      if (req.origin.test_describe) {
        req.origin.test_describe.subtest.map((elm: any) => {
          const tempData: any = [];
          elm.answers.map((item: any) => {
            const foreignKey = item.answer + item.remarks;
            if (!tempData.includes(foreignKey)) {
              const poinItem = Number(item.poin);
              const mostDesc = item.most;
              const leastDesc = item.least;

              catDescribeTests.map((cat: any) => {
                if (mostDesc == cat) {
                  summaryPoinDescribe[cat].most += 1;
                }
                if (leastDesc == cat) {
                  summaryPoinDescribe[cat].least += 1;
                }
              });

              tempData.push(foreignKey);
            }
          });

          elm.pictures.map((pict: any) => {
            pict.chapter = elm.remarks;
            resultPictures.push(pict);
          });
          resultSubListDescribe.push(elm);
        });
      }

      setCatDescribeTest(summaryPoinDescribe);

      const resultApplicant: any = [];
      req.origin.applicant.map((elm: any) => {
        resultApplicant.push(elm);
      });

      let totalPoinCreplin = 0;
      const resultSummaryCreplin: any = [];
      if (req.origin.test_creplin) {
        req.origin.test_creplin.subtest.map((elm: any) => {
          let itemPoin = 0;
          elm.answers.map((item: any) => {
            itemPoin += Number(item.poin);
          });

          elm.pictures.map((pict: any) => {
            pict.chapter = elm.remarks;
            resultPictures.push(pict);
          });
          totalPoinCreplin += itemPoin;
          resultSubListCreplin.push(elm);
        });

        resultSummaryCreplin.push(req.origin.test_creplin.summary.summary);
      }

      /*NORMA TEST CFIT */
      const normaTestCfit: any = req.origin.norma_test_cfit.filter(
        (elm: any) => elm.poin == totalPoin
      );

      if (normaTestCfit.length > 0) {
        setIqValue(normaTestCfit[0].iq_value);
      }
      /*NORMA TEST CFIT */

      if (req.origin.test_cfit) {
        setTestCfit(req.origin.test_cfit);
      }

      setSubTestCfit(resultSubListCfit);
      setSubTestIst(resultSubListIst);
      setDescribeTest(resultSubListDescribe);
      setSubTestCreplin(resultSubListCreplin);
      setSummaryCreplins(resultSummaryCreplin);
      setApplicants(resultApplicant);
      setPoin(totalPoin);
      setPictures(resultPictures);
    }
    setLoading(false);
  };

  const showDataAnswer = async (answerId: number) => {
    setLoading(true);
    const req: any = await ApiServices.getDataByIdCustom(
      String(id),
      base_url,
      "/detail-answer?id=" + answerId
    );
    if (req.is_valid == true) {
      const result: any = [];
      req.data.map((elm: any) => {
        result.push(elm);
      });
      setDataAnswers(result);
    }
    setLoading(false);
  };

  const seekCandidate = async (state: string) => {
    setLoading(true);
    const req: any = await ApiServices.get(
      base_url,
      "/seek-candidate?state=" + state + "&id=" + id
    );
    if (req.is_valid) {
      if (req.data != null) {
        setLoading(false);
        const urlCandidate = base_url + "/details?id=" + req.data.id;
        router.push(urlCandidate);
      } else {
        setErrors({ message: "Data candidate tidak ditemukan" });
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleExport = async (e: any, type: string, testType: string) => {
    e.preventDefault();
    const fileName = "summary-test-" + testType + "-" + nik;
    switch (type) {
      case "excel":
      case "csv":
        const rows: any = [];
        switch (testType) {
          case "test-cfit":
            subTestCfit.map((elm: any) => {
              elm.answers.map((item: any) => {
                rows.push({
                  subtest: elm.subtest.remarks,
                  questions_type: item.type,
                  questions: item.questions,
                  file_questions:
                    process.env.BASE_URL_SERVER +
                    "/" +
                    item.path_file +
                    "/" +
                    item.file_questions,
                  answer: item.answer,
                  right_answer: item.right_answer,
                  poin: item.poin,
                });
              });
            });
            break;
          case "test-creplin":
            subTestCreplin.map((elm: any) => {
              elm.answers.map((item: any) => {
                rows.push({
                  subtest: elm.subtest.judul,
                  questions_type: item.questions.type,
                  questions: item.questions.questions,
                  answer: item.answer,
                  right_answer: item.questions.remarks,
                  poin: item.poin,
                });
              });
            });
            break;
          case "test-ist":
            subTestIst.map((elm: any) => {
              elm.answers.map((item: any) => {
                rows.push({
                  subtest: elm.subtest.remarks,
                  questions_type: item.type,
                  questions: item.questions,
                  file_questions:
                    process.env.BASE_URL_SERVER +
                    "/" +
                    item.path_file +
                    "/" +
                    item.file_questions,
                  answer: item.answer,
                  right_answer: item.right_answer,
                  poin: item.poin,
                });
              });
            });
            break;
          case "test-describe":
            describeTest.map((elm: any) => {
              elm.answers.map((item: any) => {
                rows.push({
                  pernyataan: item.remarks,
                  most: item.most,
                  least: item.least,
                  poin: item.poin,
                });
              });
            });
            break;

          default:
            break;
        }
        if (type == "excel") {
          Exported.exportExcel(fileName, rows);
        }
        if (type == "csv") {
          Exported.exportCsv(fileName, ";", rows);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      fetchData();
    }
  }, [router]);

  return (
    <>
      <PageTitle titlePage="Report" subTitle="Summary Test CFIT Detail" />
      {loading == true ? (
        <>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: '10px' }}>
              <ButtonLoading message="Sedang Memuat Data....." />
            </div>
          </div>
        </>
      ) : (
        <>
          <DataJobVacancyCandidate
            errors={errors}
            namaLengkap={namaLengkap}
            jobName={jobName}
            dateApplied={dateApplied}
            nik={nik}
            id={id}
            base_url={base_url}
            fotoCandidate={fotoCandidate}
            seekCandidate={seekCandidate}
          />
        </>
      )}

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="text-muted">
                <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                <p>
                  Psikotes adalah alat untuk mengukur kemampuan dan karakter
                  individu melalui berbagai jenis tes. Terdiri dari tes
                  kemampuan kognitif, kepribadian, minat, dan kreativitas,
                  hasilnya digunakan dalam seleksi karyawan dan pengembangan
                  diri. Analisis hasil memberikan wawasan tentang potensi dan
                  area yang perlu dikembangkan.
                </p>
                <ul>
                  <li>
                    <b>Kemampuan Kognitif</b>: Hasil psikotes menunjukkan bahwa
                    Anda memiliki kemampuan kognitif yang baik, terutama dalam
                    logika dan pemecahan masalah.
                  </li>
                  <li>
                    <b>Kepribadian</b>: Tes kepribadian mengindikasikan bahwa
                    Anda adalah seorang yang terbuka dan adaptif, dengan
                    kemampuan berkolaborasi yang tinggi dalam tim.
                  </li>
                  <li>
                    <b>Minat Karier</b>: Hasil menunjukkan bahwa minat Anda
                    lebih condong ke bidang kreatif dan inovatif, yang cocok
                    untuk karier di industri desain atau pemasaran.
                  </li>
                  <li>
                    <b>Kreativitas</b>: Tes kreativitas mengungkapkan potensi
                    tinggi dalam berpikir di luar kotak, menunjukkan bahwa Anda
                    dapat menghasilkan ide-ide baru yang segar.
                  </li>
                  <li>
                    <b>Analisis Keseluruhan</b>: Secara keseluruhan, hasil
                    psikotes menunjukkan bahwa Anda memiliki kepribadian yang
                    seimbang, kemampuan kognitif yang baik, dan minat yang kuat
                    di bidang yang sesuai dengan potensi Anda.
                  </li>
                </ul>

                <div className="pt-3 border-top border-top-dashed mt-4">
                  <div className="row gy-3">
                    <div className="col-lg-3 col-sm-6">
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Start Test :
                        </p>
                        {testCfit && (
                          <h5 className="fs-15 mb-0">
                            {moment(testCfit.start_date)
                              .tz("Asia/Jakarta")
                              .format("YYYY-MM-DD HH:mm") ?? ""}
                          </h5>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          End Test :
                        </p>
                        {testCfit && (
                          <h5 className="fs-15 mb-0">
                            {moment(testCfit.end_date)
                              .tz("Asia/Jakarta")
                              .format("YYYY-MM-DD HH:mm") ?? ""}
                          </h5>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Status :
                        </p>
                        <div className="badge bg-danger fs-12">COMPLETE</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          POIN CFIT / IQ :
                        </p>
                        <div className="badge bg-warning fs-12">
                          {poin} / {iqValue}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {pictures.length > 0 ? (
                  <div className="pt-3 border-top border-top-dashed mt-4">
                    <h6 className="mb-3 fw-semibold text-uppercase">
                      Resources
                    </h6>
                    <div className="row g-3">
                      <div className="col-xxl-4 col-lg-6">
                        <div className="border rounded border-dashed p-2">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm">
                                <div className="avatar-title bg-light text-secondary rounded fs-24">
                                  <i className="ri-folder-zip-line"></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="fs-13 mb-1">
                                <Link
                                  href="javascript:;"
                                  className="text-body text-truncate d-block"
                                >
                                  Image Test
                                </Link>
                              </h5>
                              <div>({pictures.length})</div>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <div className="d-flex gap-1">
                                <button
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target={"." + classNamePictureModal}
                                  className="btn btn-icon text-muted btn-sm fs-18"
                                >
                                  <i className="ri-download-2-line"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Applicant</h4>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#inviteMembersModal"
                >
                  <i className="ri-share-line me-1 align-bottom"></i> Job
                </button>
              </div>
            </div>

            <div className="card-body">
              <div
                data-simplebar
                style={{ maxHeight: "235px" }}
                className="mx-n3 px-3"
              >
                <div className="vstack gap-3">
                  <DataApplicant applicants={applicants} base_url={base_url} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="tab-content text-muted">
            <div
              className="tab-pane fade show active"
              id="overview-cfit"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Sub Test List
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted">
                              Export
                              <i className="mdi mdi-chevron-down ms-1"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "excel", "test-cfit")
                              }
                            >
                              Excel
                            </Link>
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "csv", "test-cfit")
                              }
                            >
                              Csv
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <SummaryTableSubListCfit
                        datas={subTestCfit}
                        base_url={base_url}
                        classNameModal={"." + classNameModal}
                        showDataAnswer={showDataAnswer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DetailModalAnswer
              className={classNameModal}
              answers={dataAnswers}
            />

            <DetailModalImageTest
              datas={pictures}
              className={classNamePictureModal}
            />

            <div
              className="tab-pane fade"
              id="overview-personal"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Personal Describe Test List
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <Link
                            target="_blank"
                            href={
                              process.env.BASE_URL_SERVER +
                              "/berkas/DISC_2009.xls"
                            }
                            className="btn btn-soft-success btn-sm"
                          >
                            <i className="ri-download-2-line"></i> Personal
                            Describe Poin
                          </Link>{" "}
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted">
                              Export
                              <i className="mdi mdi-chevron-down ms-1"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "excel", "test-describe")
                              }
                            >
                              Excel
                            </Link>
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "csv", "test-describe")
                              }
                            >
                              Csv
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <SummaryTableDescribeTestList
                        datas={describeTest}
                        base_url={base_url}
                        classNameModal={"." + classNameModal}
                        showDataAnswer={showDataAnswer}
                        catDescribeTest={catDescribeTest}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="overview-ist" role="tabpanel">
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Sub Test Indivdual List
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted">
                              Export
                              <i className="mdi mdi-chevron-down ms-1"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "excel", "test-ist")
                              }
                            >
                              Excel
                            </Link>
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "csv", "test-ist")
                              }
                            >
                              Csv
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <SummaryTableSubListCfit
                        datas={subTestIst}
                        classNameNavigator="subtest-list-ist"
                        base_url={base_url}
                        classNameModal={"." + classNameModal}
                        showDataAnswer={showDataAnswer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="overview-creplin"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Sub Test Creplin List
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted">
                              Export
                              <i className="mdi mdi-chevron-down ms-1"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "excel", "test-creplin")
                              }
                            >
                              Excel
                            </Link>
                            <Link
                              className="dropdown-item"
                              href="javascript:;"
                              onClick={(e: any) =>
                                handleExport(e, "csv", "test-creplin")
                              }
                            >
                              Csv
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      <SummaryTableSubListCreplin
                        datas={subTestCreplin}
                        base_url={base_url}
                        summaryCreplins={summaryCreplins}
                        classNameModal={"." + classNameModal}
                        showDataAnswer={showDataAnswer}
                        classNameNavigator="subtest-list-creplin"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="overview-form-hrd"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Form HRD Feedback
                      </h4>
                      <div className="flex-shrink-0"></div>
                    </div>

                    <div className="card-body border border-dashed border-end-0 border-start-0">
                      {router.isReady ? (
                        <FormFeedbackHrd
                          base_url={base_url}
                          applicant={id}
                          nik={nik}
                          feedback={candidateFeedback}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="text-end mb-3">
            <button
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target={"." + classNameSettingCandidateRetestModal}
            >
              Re-Test Candidate
            </button>
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

      {/* Modal Section */}
      {router.isReady && (
        <FormSettingRetest
          className={classNameSettingCandidateRetestModal}
          baseUrl={base_url}
          id={id}
        />
      )}
      {/* Modal Section */}
    </>
  );
};

export default FormSummaryTestCfitDetailViews;
