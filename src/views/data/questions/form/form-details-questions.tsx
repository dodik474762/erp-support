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
import FormTableAnswer from "./form-table-answer";
import FormModalAnswer from "./modal/form-modal-answer";

const FormDetailQuestionsViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const urlApiTest = "/data/test";
  const classNameModal = "modal-answer";

  const [questions, setQuestions] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [tipe, setTipe]: any = useState({ value: "TEXT", label: "TEXT" });
  const [tipes, setTipes]: any = useState([
    { value: "IMAGE", label: "IMAGE" },
    { value: "TEXT", label: "TEXT" },
  ]);
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
    type: tipe,
    remarks: remarks,
    answers: answers,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setQuestions(req.data.questions);
      setRemarks(req.data.remarks);
      setTipe({
        value: req.data.type,
        label: req.data.type,
      });
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
          type: element.type.toUpperCase(),
          remarks: element.remarks,
          file: element.file,
          file_text: element.file_path + "/" + element.file,
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
    const req: any = await ApiServices.get(urlApiTest, "/getAll");
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
      case "tipe":
        tipes.forEach((option: any) => {
          if (option.value === e.value) {
            setTipe(option);
          }
        });
        break;

      default:
        tipes.forEach((option: any) => {
          if (option.value === e.value) {
            setTipe(option);
          }
        });
        break;
    }
  };

  const handleAddAnswer = async (e: any) => {
    e.preventDefault();
    const answerVal = e.target.form["answer"]
      ? e.target.form["answer"].value
      : null;
    const typeAnswer = e.target.form["tipe-answer"].value.toLowerCase();
    const remarksVal = e.target.form["remarks"].value;
    const fileAnswerVal =
      typeAnswer === "image"
        ? e.target.form["fileAnswer"]
          ? e.target.form["fileAnswer"].files[0]
          : null
        : null;
    const fileAnswerValTect =
      typeAnswer === "image"
        ? e.target.form["fileAnswer"]
          ? e.target.form["fileAnswer"].value
          : null
        : null;
    const result = {
      id: dataAnswer.current.length + 1,
      answer: answerVal,
      type: typeAnswer.toUpperCase(),
      remarks: remarksVal,
      file: fileAnswerVal,
      file_text: fileAnswerValTect,
      is_right: false,
      origin_id: "",
    };

    if (result.type.toLowerCase() == "image") {
      if (fileAnswerVal == null) {
        setErrors({ message: "File Harus Diisi" });
        return;
      }
    } else {
      if (result.answer == null || result.answer == "") {
        setErrors({ message: "Answer Harus Diisi" });
        return;
      }
    }
    if (result.remarks == null || result.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return;
    }

    // console.log('answer', answer);
    // const answerItem = dataAnswer.current.find(
    //   (item: any) => item.id === result.id
    // );
    // if (answerItem) {
    //   setErrors({ message: "Product Sudah Ada" });
    // } else {
    await setAnswers([...answers, result]);
    dataAnswer.current.push(result);
    // }
  };

  const handleRemove = async (id: number) => {
    id = id + 1;
    await setAnswers(answers.filter((item: any) => item.id !== id));
    dataAnswer.current = dataAnswer.current.filter(
      (item: any) => item.id !== id
    );
  };

  const handleCheck = async (e: any) => {
    const check = answers.find((item: any) => item.id == e.target.value);
    if (check) {
      check.is_right = e.target.checked;
      answers[answers.findIndex((item: any) => item.id == e.target.value)] =
        check;
      await setAnswers(answers);
      dataAnswer.current = answers;
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
      <PageTitle titlePage="Data" subTitle="Questions Detail" />

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
                    Tipe
                  </label>
                  <Select
                    defaultValue={tipe}
                    name="type-answer"
                    onChange={(e: any) => handleSelectionChange(e, "tipe")}
                    options={tipes}
                  />
                </div>
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
                {tipe.value === "TEXT" ? (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-title-input">
                      Questions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter questions"
                      disabled
                      value={questions}
                      onInput={(e: any) => setQuestions(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please Enter a questions
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="fileImage">
                      Questions Image
                    </label>

                    {filePath == null ? (
                      <input
                        type="file"
                        className="form-control"
                        id="fileImage"
                        placeholder="Enter image"
                        onChange={(e: any) => setFileImage(e.target.value)}
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <Link
                          href={
                            process.env.BASE_URL_SERVER +
                            "/" +
                            filePath +
                            "/" +
                            fileImage
                          }
                          target="_blank"
                        >
                          {fileImage}
                        </Link>
                      </div>
                    )}
                  </div>
                )}

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
              </div>
            </div>

            <FormTableAnswer
              answers={answers}
              classNameModal={"." + classNameModal}
              handleRemove={handleRemove}
              handleCheck={handleCheck}
              readonOnly={true}
            />

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

export default FormDetailQuestionsViews;
