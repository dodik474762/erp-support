import ApiServices from "@/services/api.services";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment-timezone";
import JobDescription from "../job-description";
import CandidateTestDescribeList from "../../list/candidate-test-describe-list";
import Message from "@/utility/message";
import Helper from "@/utility/helper";
import Webcam from "react-webcam";
import PolicyRemarksTest from "../policy-remarks-test";

const CandidateTestDescribe = (props: any) => {
  const { base_url = "" } = props;
  const router = useRouter();
  const category = router.query.category;
  const test_sub = router.query.test_sub;
  const candidate_test_sub = router.query.candidate_test_sub;
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
    candidate_test_sub: candidate_test_sub,
    candidate_test: candidate_test,
    candidate: candidate,
    test_sub: test_sub,
    test: test,
    job_schedule: job_test_schedule,
    job: job,
    answers: questions,
  };

  const fetchDataTest = async () => {
    const req: any = await ApiServices.get(
      base_url,
      "/get-test-describe?test=" +
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
      console.log(`data`, data);
      const resultData = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.updated_at = element.updated_at == null ? "" : moment(element.updated_at.replace("T", " ").replace("Z", ""))
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm");
        resultData.push(element);
      }

      setDataTest(resultData);
    }
  };

  const handleChangeMost = (e: any, isMultiple: any) => {
    setErrors(null);
    const name = e.target.name.toString().replace("most-radio-", "");
    const found = questions.find((item: any) => item.id == name);
    const dataVal = e.target.value.split("_");
    if (found) {
      if(dataVal[dataVal.length - 1] == found.questions_least){
        alert('Pilihan jawaban tidak boleh sama');
        e.target.checked = false;
        return;
      }
      found.answer[0] = Number(dataVal[0]);
      found.most = dataVal[1];
      found.questions = dataVal[dataVal.length - 1] +"-"+found.questions_least;
      found.questions_most = dataVal[dataVal.length - 1];
    } else {
      questions.push({
        id: name,
        least: null,
        most: dataVal[1],
        answer: [Number(dataVal[0])],
        questions_item: name,
        questions_most: dataVal[dataVal.length - 1],
        questions_least: null,
        questions: dataVal[dataVal.length - 1],
        candidate_schedule_test_sub: candidate_test_sub,
      });
    }

    // console.log(questions);

    if (questions.length == dataTest.length) {
      setIsCompleteTest(true);
    }
    setQuestions([...questions]);
  };

  const handleChangeLeast = (e: any, isMultiple: any) => {
    setErrors(null);
    const name = e.target.name.toString().replace("least-radio-", "");
    const found = questions.find((item: any) => item.id == name);
    const dataVal = e.target.value.split("_");
    if (found) {
      if(dataVal[dataVal.length - 1] == found.questions_most){
        alert('Pilihan jawaban tidak boleh sama');
        e.target.checked = false;
        return;
      }
      found.answer[0] = Number(dataVal[0]);
      found.least = dataVal[1];
      found.questions = found.questions_most+"-"+dataVal[dataVal.length - 1];
      found.questions_least = dataVal[dataVal.length - 1];
    } else {
      questions.push({
        id: name,
        most: null,
        least: dataVal[1],
        answer: [Number(dataVal[0])],
        questions_item: name,
        questions_least: dataVal[dataVal.length - 1],
        questions: dataVal[dataVal.length - 1],
        questions_most: null,
        candidate_schedule_test_sub: candidate_test_sub,
      });
    }

    // console.log(questions);

    if (questions.length == dataTest.length) {
      setIsCompleteTest(true);
    }
    setQuestions([...questions]);
    capture();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(postData);
    submitTheTest();
  };

  const submitTheTest = async () => {
    if (validation(postData)) {
      setLoading(true);
      postData.start_date =
        localStorage.getItem(`doing-test-${candidate_test_sub}-time`) ??
        moment().format("YYYY-MM-DD HH:mm");
      const req: any = await ApiServices.submit(
        base_url,
        postData,
        "/submit-sub-test-describe"
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
    }else{
      setErrors({ message: "Lengkapi Jawaban Terlebih Dahulu" });
    }
  };

  const validation = (data: any): boolean => {
    let totalAnswers = 0;
    data.answers.forEach((element: any) => {
      if (element.most != null && element.least != null) {
        totalAnswers += 1;
      }else{
        console.log(element);
      }
    });

    if(totalAnswers == dataTest.length){
      return true;
    }

    return false;
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
    if (!isCompleteTest) {
      const complete = localStorage.getItem(
        `candidate-test-${candidate_test}-complete`
      );
      if (complete == "true") {
        setIsCompleteTest(true);
      }
    }
  }, [isCompleteTest]);

  useEffect(() => {
    if (!router.isReady) return;
    const doingTest = localStorage.getItem(
      `doing-test-${candidate_test_sub}-time`
    );
    if (!doingTest) {
      localStorage.setItem(
        `doing-test-${candidate_test_sub}-time`,
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

            <CandidateTestDescribeList
              data={dataTest}
              handleChangeMost={handleChangeMost}
              handleChangeLeast={handleChangeLeast}
            />

            <div className="text-end">
              {
                errors == null ? null : (
                  <div className="alert alert-danger" role="alert">
                    {errors.message}
                  </div>
                )
              }
              <br />
              <Link
                className="btn btn-soft-info waves-effect waves-light"
                href={backUrl}
              >
                Back
              </Link>
              &nbsp; &nbsp;
              <button
                type="submit"
                className="btn btn-success w-sm"
                onClick={(e: any) => handleSubmit(e)}
                onSubmit={(e: any) => handleSubmit(e)}
              >
                Submit
              </button>
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

export default CandidateTestDescribe;
