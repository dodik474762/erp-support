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
import FormTableAnswerDescribe from "./form-table-answer-desc";
import FormModalAnswerDescribe from "./modal/form-modal-answer-describe";

const FormQuestionsDescribeViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const urlApiTest = "/data/test";
  const classNameModal = "modal-answer";

  const [questions, setQuestions] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [test, setTest] = useState({});
  const [tests, setTests] = useState([]);
  const [testSub, setTestSub] = useState({});
  const [testSubs, setTestSubs] = useState([]);
  const [answers, setAnswers]: any = useState([]);
  const dataAnswer = useRef([]) as any;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const postData: any = {
    id: id,
    questions: questions,
    test: test,
    test_sub: testSub,
    remarks: remarks,
    answers: answers,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setQuestions(req.data.questions);
      setRemarks(req.data.remarks);
      setTest({ value: req.data.test, label: req.data.judul });
      setTestSub({ value: req.data.test_sub, label: req.data.sub_judul });
      setFileImage(req.data.file_questions);
      setFilePath(req.data.path_file);

      fetDataAnswer(req.data.id);
    }
    setLoading(false);
  };

  const fetDataAnswer = async (questions: string) => {
    setLoading(true);
    const req: any = await ApiServices.getDataByIdCustom(
      String(id),
      base_url,
      "/get-list-answer?questions=" + questions
    );
    if (req.is_valid == true) {
      const result: any = [];
      let no = 1;
      req.data.map((element: any) => {
        const answerItem = {
          id: no++,
          answer: element.answer,
          describe: element.type,
          most: element.most,
          least: element.least,
          is_right: element.is_right,
          origin_id: element.id,
        };
        result.push(answerItem);
      });

      setAnswers(result);
      dataAnswer.current = result;
    }
    setLoading(false);
  };

  const fetchTest = async () => {
    setLoading(true);
    const req: any = await ApiServices.get(urlApiTest, "/getAll?category=TEST_CHAR");
    if (req.is_valid == true) {
      const results: any = [];
      req.data.forEach((option: any) => {
        results.push({ value: option.id, label: option.judul });
      });

      setTests(results);
    }
    setLoading(false);
  };

  const fetchTestSub = async (test: String) => {
    setLoading(true);
    const req: any = await ApiServices.get(
      urlApiTest,
      "/get-all-subtest?test=" + test
    );
    if (req.is_valid == true) {
      const results: any = [];
      req.data.forEach((option: any) => {
        results.push({ value: option.id, label: option.judul });
      });

      setTestSubs(results);
    }
    setLoading(false);
  };

  const handleSelectionChange = (e: any, type = "") => {
    switch (type) {
      case "test":
        tests.forEach((option: any) => {
          if (option.value === e.value) {
            setTest(option);
            fetchTestSub(option.value);
          }
        });
        break;
      case "subtest":
        testSubs.forEach((option: any) => {
          if (option.value === e.value) {
            setTestSub(option);
          }
        });
        break;
    }
  };

  const validation = (data: any): boolean => {
    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (data.questions == "") {
      setErrors({ message: "Questions Harus Diisi" });
      return false;
    }

    if (
      data.test == null ||
      data.test == "" ||
      Object.keys(data.test).length === 0
    ) {
      setErrors({ message: "Test Harus Diisi" });
      return false;
    }

    if (
      data.test_sub == null ||
      data.test_sub == "" ||
      Object.keys(data.test_sub).length === 0
    ) {
      setErrors({ message: "Sub Test Harus Diisi" });
      return false;
    }

    if (data.answers.length == 0) {
      setErrors({ message: "Jawaban Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleAddAnswer = async (e: any) => {
    e.preventDefault();
    const answerVal = e.target.form["pernyataan"]
      ? e.target.form["pernyataan"].value
      : null;
    const most = e.target.form["most-answer"].value.toLowerCase();
    const least = e.target.form["least-answer"].value.toLowerCase();
    const describe = e.target.form["describe"].value;
    const result = {
      id: dataAnswer.current.length + 1,
      answer: answerVal,
      most: most,
      least: least,
      describe: describe,
      is_right: true,
      origin_id: "",
    };

    if (result.answer == null || result.answer == "") {
      setErrors({ message: "Pernyataan Harus Diisi" });
      return;
    }
    if (result.most == null || result.most == "") {
      setErrors({ message: "Most Harus Diisi" });
      return;
    }
    if (result.least == null || result.least == "") {
      setErrors({ message: "Least Harus Diisi" });
      return;
    }
    if (result.describe == null || result.describe == "") {
      setErrors({ message: "Describe Harus Diisi" });
      return;
    }

    await setAnswers([...answers, result]);
    dataAnswer.current.push(result);
  };

  const handleRemove = async (id: number) => {
    id = id + 1;
    await setAnswers(answers.filter((item: any) => item.id !== id));
    dataAnswer.current = dataAnswer.current.filter(
      (item: any) => item.id !== id
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
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
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      fetchTest();
    }
  }, [router]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Questions Describe Add" />

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
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Test
                  </label>
                  <Select
                    defaultValue={test}
                    onChange={(e: any) => handleSelectionChange(e, "test")}
                    options={tests}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Sub Test
                  </label>
                  <Select
                    defaultValue={testSub}
                    onChange={(e: any) => handleSelectionChange(e, "subtest")}
                    options={testSubs}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Questions
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter questions"
                    value={questions}
                    onInput={(e: any) => setQuestions(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a questions
                  </div>
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

            <FormTableAnswerDescribe
              answers={answers}
              classNameModal={"." + classNameModal}
              handleRemove={handleRemove}
            />

            <FormModalAnswerDescribe
              className={classNameModal}
              handleAddAnswer={handleAddAnswer}
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

export default FormQuestionsDescribeViews;
