import ButtonLoading from "@/components/layouts/ButtonLoading";
import ApiServices from "@/services/api.services";
import Message from "@/utility/message";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import JobDescription from "../job-description";
import DataTestList from "../../list/data-test-list";
import Countdown from "react-countdown";
import moment from "moment-timezone";
import CountdownTimer from "@/components/layouts/Countdown/countdown-timer";
import Helper from "@/utility/helper";
import Webcam from "react-webcam";
import Example from "@/utility/example";
import PolicyRemarksTest from "../policy-remarks-test";

const FormCandidateTest = (props: any) => {
  const { base_url = "" } = props;
  const router = useRouter();
  const category = router.query.category;
  const job = router.query.job;
  const job_test_schedule = router.query.job_test_schedule;
  const test = router.query.test;
  const candidate_test = router.query.candidate_test;
  const candidate_test_sub = router.query.candidate_test_sub;
  const test_sub = router.query.test_sub;
  const candidate = router.query.candidate;
  const candidate_applied = router.query.candidate_applied;
  const confirm = router.query.confirm;
  const backUrl = `/recrutment/candidate-test/candidate-sub-test?category=${category}&job=${job}&job_test_schedule=${job_test_schedule}&test=${test}&candidate_test=${candidate_test}&candidate_test_sub=${candidate_test_sub}&candidate=${candidate}&candidate_applied=${candidate_applied}&confirm=${confirm}&readytest=1`;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});

  const [questions, setQuestions]: any = useState([]);
  const [dataTest, setDataTest]: any = useState([]);
  const [judul, setJudul]: any = useState("");
  const [content, setContent]: any = useState("");
  const [fileExample, setFileExample]: any = useState("");
  const [remarks, setRemarks]: any = useState("");

  const [timeTest, setTimeTest] = useState(0);
  const [isDoingTest, setIsDoingTest] = useState(false);
  const [isCompleteTest, setIsCompleteTest] = useState(false);
  const [isCompleteSubTest, setIsCompleteSubTest] = useState(false);

  const [timeTestIntroduction, setTimeTestIntroduction] = useState(0);
  const dataQuestions: any = useRef([]);

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
    id: candidate_test_sub,
    job: job,
    job_schedule: job_test_schedule,
    candidate: candidate,
    candidate_test: candidate_test,
    test: test,
    answers: questions,
  };

  const fetchDataTest = async () => {
    // console.log(ApiServices.baseUrl);
    const req: any = await ApiServices.get(
      base_url,
      "/get-test?test=" +
        test +
        "&candidate_test=" +
        candidate_test +
        "&test_sub=" +
        test_sub +
        "&candidate_test_sub=" +
        candidate_test_sub
    );
    if (req.is_valid == true) {
      const data = req.data.questions;
      const resultData = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.questions_item = element.id;
        resultData.push(element);
      }
      if (req.origin.introduction) {
        setJudul(req.origin.introduction.judul);
        setContent(req.origin.introduction.content);
        setRemarks(req.origin.introduction.remarks);
        setTimeTest(req.origin.introduction.timetest_sub_test);
        if (req.origin.introduction.timetest) {
          setTimeTestIntroduction(req.origin.introduction.timetest);
        }
        setFileExample(
          process.env.BASE_URL_SERVER +
            "/" +
            req.origin.introduction.file_path +
            "/" +
            req.origin.introduction.file
        );
      }
      setDataTest(resultData);
    }
  };

  const handleKeyPress = useCallback((event: any) => {
    if (
      event.key.toLowerCase() === "f5" ||
      event.key.toLowerCase() === "control" ||
      event.key.toLowerCase() === "alt"
    ) {
      console.log("ini pencet f5");
      alert("Dilarang menekan tombol F5/Control+Alt");
      event.preventDefault();
    }
  }, []);   

  const handleChangeAnswer = (e: any, isMultiple: any) => {
    setErrors(null);
    console.log('change answer', e.target.name, e.target.value);
    const found = questions.find((item: any) => item.id == e.target.name);
    if (found) {
      if (isMultiple == "1") {
        const totalAnswer = found.answers.length;
        const answerMax = e.target.id.split(',');
        if(totalAnswer == answerMax.length){
          alert("Tidak boleh lebih dari "+answerMax.length);
          e.target.checked = false;
          return;
        }
        if (e.target.checked) {
          found.answers.push(Number(e.target.value));
        } else {
          const index = found.answers.indexOf(e.target.value);
          found.answers.splice(index, 1);
        }
      } else {
        if (isMultiple == "1") {
          found.answers.push(Number(e.target.value));
        } else {
          found.answers[0] = Number(e.target.value);
        }
      }
    } else {
      questions.push({
        id: e.target.name,
        answers: [Number(e.target.value)],
        questions_item: e.target.name,
        candidate_schedule_test_sub: candidate_test_sub,
      });
    }

    if (questions.length == dataTest.length) {
      setIsCompleteTest(true);
    }
    setQuestions([...questions]);
    dataQuestions.current = questions;
    capture();
  };

  const ButtonSubmit = () => {
    return (
      <button
        type="submit"
        className="btn btn-success w-sm"
        onClick={(e: any) => handleSubmit(e)}
        onSubmit={(e: any) => handleSubmit(e)}
      >
        Submit
      </button>
    );
  };

  const onComplete = (message: string) => {
    /* */
    setIsCompleteTest(true);
    submitTheTest();
  };

  const onCompleteIntroductionTest = (message: string) => {
    /* */
    doTheTest();
  };

  const handleDoTheTest = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    /*START TEST CANDIDATE */
    doTheTest();
    /*START TEST CANDIDATE */
    setLoading(false);
  };

  const doTheTest = async () => {
    const candidateStartTest = moment(new Date())
      .tz("Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");
    localStorage.setItem(`doing-test-${candidate_test_sub}`, "true");
    localStorage.setItem(
      `doing-test-${candidate_test_sub}-time`,
      candidateStartTest
    );
    setIsDoingTest(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsCompleteTest(true);
    submitTheTest();
  };

  const submitTheTest = async () => {
    setLoading(true);
    postData.answers = dataQuestions.current;
    postData.start_date = localStorage.getItem(
      `doing-test-${candidate_test_sub}-time`
    );
    const req: any = await ApiServices.submit(
      base_url,
      postData,
      "/submit-sub-test"
    );
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
      localStorage.setItem(`complete-test-${candidate_test_sub}`, "true");
      if (imageCaptures.current.length > 0) {
        await submitSubTestPicture();
      }
      router.push(backUrl);
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
    if (router.isReady) {
      if (!isDoingTest) {
        const doing = localStorage.getItem(`doing-test-${candidate_test_sub}`);
        if (doing == "true") {
          setIsDoingTest(true);
        }
      }
    }
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      if (!isDoingTest) {
        const completeSubTest = localStorage.getItem(
          `complete-test-${candidate_test_sub}`
        );
        if (completeSubTest == "true") {
          setIsCompleteSubTest(true);
        }
      }
    }
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      if (dataTest.length == 0) {
        fetchDataTest();
      }
    }
  }, [router]);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("ctrlKey ", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("ctrlKey", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card">
          {router.isReady ? (
            <JobDescription job={job} job_test_schedule={job_test_schedule} />
          ) : null}
          <PolicyRemarksTest />

          <div className="card-body p-4 border border-dashed border-end-0 border-start-0">
            {
            // isCompleteSubTest ? (
            //   <h3 className="text-success text-muted w-sm text-center">
            //     <i>Sub Test Already Complete</i>{" "}
            //   </h3>
            // ) : 
            (
              <>
                {timeTest && dataTest.length > 0 && isDoingTest && (
                  <CountdownTimer onComplete={onComplete} initTime={timeTest} />
                )}
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <i
                      data-feather="check-circle"
                      className="text-success icon-dual-success icon-xs"
                    ></i>
                  </div>
                  <div className="flex-grow-1">
                    {isDoingTest == true ? null : (
                      <>
                        <h5>{judul}</h5>
                        <p className="text-muted">{content}</p>
                        <p className="text-muted">
                          {fileExample && (
                            <Image
                              src={fileExample}
                              alt="Example"
                              className="img-fluid"
                              width={600}
                              height={600}
                            />
                          )}
                        </p>
                        <p className="text-muted">{remarks}</p>
                      </>
                    )}
                    <div className="text-end">
                      {timeTestIntroduction > 0 && isDoingTest == false ? (
                        <CountdownTimer
                          onComplete={onCompleteIntroductionTest}
                          initTime={timeTestIntroduction}
                        />
                      ) : null}
                      {loading ? (
                        <ButtonLoading message="Loading Proses Saving ...." />
                      ) : isDoingTest == true ? null : dataTest.length > 0 ? (
                        <>
                          <button
                            type="submit"
                            className="btn btn-success w-sm"
                            onClick={(e: any) => handleDoTheTest(e)}
                            onSubmit={(e: any) => handleDoTheTest(e)}
                          >
                            Do Test
                          </button>
                        </>
                      ) : null}
                    </div>

                    <br />
                    {isDoingTest == true
                      ? dataTest.map((item: any, index: number) => {
                          return (
                            <>
                              <DataTestList
                                key={item.id}
                                item={item}
                                index={index}
                                handleChangeAnswer={(e: any) =>
                                  handleChangeAnswer(e, item.multi_answer)
                                }
                              />
                            </>
                          );
                        })
                      : null}
                  </div>
                </div>
              </>
            )}

            <div className="text-end">
              &nbsp; &nbsp;
              {timeTest && dataTest.length > 0 && isDoingTest && (
                <CountdownTimer onComplete={onComplete} initTime={timeTest} />
              )}
              <br />
              <Link
                className="btn btn-soft-info waves-effect waves-light"
                href={backUrl}
              >
                Back
              </Link>
              {isCompleteTest || dataTest.length == 0 ? (
                <ButtonSubmit />
              ) : (
                <>
                  {/* {isDoingTest && isCompleteSubTest == false
                    ? timeTest && (
                        <Countdown date={Date.now() + timeTest * 1000}>
                          <ButtonSubmit />
                        </Countdown>
                      )
                    : null} */}
                </>
              )}
              {isCompleteSubTest ? null : (
                <p className="text-muted">
                  <br />
                  <i>Please complete your all the test</i>
                </p>
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

export default FormCandidateTest;
