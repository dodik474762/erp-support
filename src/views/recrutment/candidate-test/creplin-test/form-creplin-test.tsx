import ApiServices from "@/services/api.services";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment-timezone";
import JobDescription from "../job-description";
import Message from "@/utility/message";
import Helper from "@/utility/helper";
import Webcam from "react-webcam";
import CandidateTestCreplinList from "../../list/candidate-test-creplin-list";
import CountdownTimer from "@/components/layouts/Countdown/countdown-timer";
import PolicyRemarksTest from "../policy-remarks-test";

const CandidateTestCreplin = (props: any) => {
  const { base_url = "" } = props;
  const router = useRouter();
  const category = router.query.category;
  const test = router.query.test;
  const job = router.query.job;
  const job_test_schedule = router.query.job_test_schedule;
  const candidate_test = router.query.candidate_test;
  const candidate = router.query.candidate;
  const confirm = router.query.confirm;
  const candidate_applied = router.query.candidate_applied;
  const backUrl = `/recrutment/candidate-test?job=${job}&job_test_schedule=${job_test_schedule}&candidate=${candidate}&candidate_applied=${candidate_applied}&confirm=${confirm}&readytest=1`;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [isCompleteTest, setIsCompleteTest] = useState(false);
  const [dataTest, setDataTest]: any = useState([]);
  const [questions, setQuestions]: any = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalQuestionComplete, setTotalQuestionComplete] = useState(0);
  const [candidateTestSub, setCandidateTestSub]: any = useState(null);
  const [testSub, setTestSub]: any = useState(null);
  const [timeTest, setTimeTest] = useState(0);

  const questionsData: any = useRef([]);

  /*INIT WEBCAM */
  const webcamRef: any = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); // initialize it
  const imageCaptures: any = useRef([]);
  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    imageCaptures.current.push(imageSrc);
  }, [webcamRef]);
  /*INIT WEBCAM */

  const postData: any = {
    candidate_test_sub: candidateTestSub,
    candidate_test: candidate_test,
    candidate: candidate,
    test_sub: testSub,
    test: test,
    job_schedule: job_test_schedule,
    job: job,
    answers: questions,
  };

  const fetchDataTest = async () => {
    const req: any = await ApiServices.get(
      base_url,
      "/get-test-creplin?test=" + test + "&candidate_test=" + candidate_test
    );
    if (req.is_valid == true) {
      const data = req.data.questions;
      const subTestData = req.data.subtest;
      if (subTestData.length > 0) {
        setCandidateTestSub(subTestData[0].id);
        setTestSub(subTestData[0].test_sub);
      }
      setTotalQuestions(req.data.totalSoal);
      setTotalQuestionComplete(req.data.totalSoalComplete);
      const resultSubTest: any = [];
      for (let index = 0; index < subTestData.length; index++) {
        const element = subTestData[index];
        const questionsData = data.filter(
          (item: any) => item.subtest.test_sub == element.test_sub
        );
        element.questions = questionsData;
        resultSubTest.push(element);
      }

      if (req.data.totalSoal == req.data.totalSoalComplete) {
        setIsCompleteTest(true);
      }

      setDataTest(resultSubTest);
    }
  };

  const handleChangeAnswer = (e: any) => {
    setErrors(null);
    const quest = e.target.name.split("-");
    const found = questions.find((item: any) => item.id == quest[0]);
    const dataVal = e.target.value;
    if (found) {
      found.answer[0] = Number(dataVal);
    } else {
      questions.push({
        id: quest[0],
        answer: [Number(dataVal)],
        questions_item: quest[0],
        right_answer: quest[1],
      });
    }

    setQuestions([...questions]);

    questionsData.current = questions;

    handleChangeInputAnswer(e);
  };

  const handleChangeInputAnswer = (e: any) => {
    const { maxLength, value, name } = e.target;
    console.log("name", name);
    const [fieldId, fieldRemarks, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);
    const inputsAnswers = document.querySelectorAll(`.input-answer`);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < inputsAnswers.length) {
        // Get the next input field using it's name
        const nextfield: any = document.querySelector(
          `input[id=field-${fieldIntIndex + 1}]`
        );

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  const onComplete = (message: string) => {
    /* */
    capture();
    submitTheTest();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(postData);
    capture();
    submitTheTest();
  };

  const submitTheTest = async () => {
    setLoading(true);
    postData.answers = questionsData.current;
    postData.start_date =
      localStorage.getItem(`doing-test-${candidateTestSub}-time`) ??
      moment().format("YYYY-MM-DD HH:mm");
    const req: any = await ApiServices.submit(
      base_url,
      postData,
      "/submit-sub-test-creplin"
    );
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
      localStorage.setItem(`complete-test-${candidateTestSub}`, "true");
      if (imageCaptures.current.length > 0) {
        await submitSubTestPicture();
      }
      window.location.reload();
    } else {
      Message.info(req.message);
      setErrors({ message: req.message });
    }
    setLoading(false);
  };

  const submitSubTestPicture = async () => {
    const formData: any = new FormData();
    formData.append("data", JSON.stringify(postData));
    let no = 1;
    // imageCaptures.current.push(Example.base64ImgExample());
    imageCaptures.current.forEach((element: any) => {
      const file = Helper.dataURLtoFile(element, `sub-test-picture-${no}.jpg`);
      if (file != null) {
        formData.append("files-answer-" + no++, file);
      }
    });

    const req: any = await ApiServices.submitMultiForm(
      base_url,
      formData,
      "/submit-sub-test-picture"
    );
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
    } else {
      Message.info(req.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const doingTest = localStorage.getItem(
      `doing-test-${candidateTestSub}-time`
    );
    if (!doingTest) {
      localStorage.setItem(
        `doing-test-${candidateTestSub}-time`,
        moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm")
      );
    }
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      if (dataTest.length == 0) {
        fetchDataTest();
      }
    }
  }, [router]);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card">
          {router.isReady ? (
            <JobDescription job={job} job_test_schedule={job_test_schedule} />
          ) : null}
          <PolicyRemarksTest />
          <div className="card-body p-4 border border-dashed border-end-0 border-start-0">
            <br />

            <p className="text-muted">
              Silakan jawab setiap soal dengan menekan mengisi hasil pada kotak,
              jika hasilnya puluhan ambil angka paling belakang Ex: jawab [10]
              maka diisi 0, [11] = 1, [12] = 2
            </p>
            <p className="text-muted">
              Total Soal : {totalQuestions} / Total Soal Telah Dijawab :{" "}
              {totalQuestionComplete}
              {dataTest.length > 0 && isCompleteTest == false ? (
                <CountdownTimer onComplete={onComplete} initTime={15} />
              ) : null}
            </p>

            <CandidateTestCreplinList
              data={dataTest}
              handleChangeAnswer={handleChangeAnswer}
            />

            <div className="text-end">
              <br />
              <Link
                className="btn btn-soft-info waves-effect waves-light"
                href={backUrl}
              >
                Back
              </Link>
              &nbsp; &nbsp;
              {!isCompleteTest ? (
                <button
                  type="submit"
                  className="btn btn-success w-sm"
                  onClick={(e: any) => handleSubmit(e)}
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  Submit
                </button>
              ) : (
                <p className="text-success">Test Telah Selesai</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Webcam height={600} width={600} ref={webcamRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateTestCreplin;
