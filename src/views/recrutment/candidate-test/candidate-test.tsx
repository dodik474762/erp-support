import Accordions from "@/components/Accordions";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import ApiServices from "@/services/api.services";
import Message from "@/utility/message";
import Link from "next/link";
import { useEffect, useState } from "react";
import CandidateBiodata from "./candidate-biodata";
import CandidateTestList from "../list/candidate-test-list";
import { useRouter } from "next/router";
import JobDescription from "./job-description";
import moment from "moment-timezone";
import CameraTestView from "./camera-test/camera-test-views";
import PolicyRemarksTest from "./policy-remarks-test";

const CandidateTest = (props: any) => {
  const { base_url = "" } = props;
  const router = useRouter();
  const job = router.query.job;
  const job_test_schedule = router.query.job_test_schedule;
  const candidate = router.query.candidate;
  const confirm = router.query.confirm;
  const candidate_applied = router.query.candidate_applied;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [isCompleteBio, setIsCompleteBio] = useState(false);
  const [isCompleteTest, setIsCompleteTest] = useState(false);
  const [isCompleteTestFirst, setIsCompleteTestFirst] = useState(false);
  const [isCompleteTestSecond, setIsCompleteTestSecond] = useState(false);
  const [isCompleteTestThird, setIsCompleteTestThird] = useState(false);
  const [isCompleteTestFourth, setIsCompleteTestFourth] = useState(false);
  const [dataTest, setDataTest]: any = useState([]);
  const [isOverDue, setIsOverDue] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [isKraeplinComplete, setIsKraeplinComplete] = useState(false);

  const fetchDataTest = async () => {
    const req: any = await ApiServices.get(
      base_url,
      "/get-all?candidate=" +
        candidate +
        "&job_test_schedule=" +
        job_test_schedule +
        "&job=" +
        job
    );
    if (req.is_valid == true) {
      const data = req.data;
      const resultData = [];
      let totalCompleteTest = 0;
      let kreplinComplete = false;
      console.log('data', data);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.updated_at =
          element.updated_at == null
            ? ""
            : moment(element.updated_at.replace("T", " ").replace("Z", ""))
                .tz("Asia/Jakarta")
                .format("YYYY-MM-DD HH:mm");
        if (element.status == "COMPLETE") {
          totalCompleteTest++;
        }

        /*CEK KRAEPLIN COMPLETE */
        if (
          element.status == "COMPLETE" &&
          element.category == "TEST_CREPLIN"
        ) {
          kreplinComplete = true;
        }
        /*CEK KRAEPLIN COMPLETE */
        resultData.push(element);
      }

      let isExistCrepling = false;
      resultData.forEach((element: any) => {
        if (element.category == "TEST_CREPLIN") {
          isExistCrepling = true;
        }
      })
      if(isExistCrepling == false){
        kreplinComplete = true;
      }
      /*CEK KRAEPLIN COMPLETE */      

      setDataTest(resultData);
      setIsKraeplinComplete(kreplinComplete);
      if (totalCompleteTest == resultData.length) {
        setIsCompleteTest(true);
      }

      cekOverDue(req.origin.overdue, resultData);
    }
  };

  const switchOnCamera = async () => {
    const not_granted = !(await navigator.mediaDevices.enumerateDevices())[0]
      .label;
    setCameraOn(!not_granted);
  };

  const cekOverDue = (data: any, test: any[]) => {
    if (data) {
      let start_date = moment(
        data.start_date.replace("T", " ").replace("Z", "")
      )
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm");
      let withTime2Hours = false;
      if (test.length > 0) {
        start_date = moment(
          test[0].created_at.replace("T", " ").replace("Z", "")
        )
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm");
        withTime2Hours = true;
      }
      const endTime = moment(start_date.replace("T", " ").replace("Z", ""))
        .tz("Asia/Jakarta")
        .add(2, "hours")
        .format("YYYY-MM-DD HH:mm");
      const end_date = moment(data.end_date)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm");
      const current = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");

      // console.log('current', current, 'start_date', start_date, 'end_date', end_date, 'endTime', endTime);
      if (
        new Date(current) > new Date(end_date) ||
        new Date(start_date) > new Date(endTime)
      ) {
        setIsOverDue(true);
      }
    }
  };

  useEffect(() => {
    if (!isCompleteBio) {
      const complete = localStorage.getItem("candidate-bio-complete");
      const candidateid = localStorage.getItem("candidateid");
      if (complete == "true") {
        setIsCompleteBio(true);
      }
    }
  }, [isCompleteBio]);

  useEffect(() => {
    if (router.isReady) {
      if (confirm == "no") {
        fetchDataTest();
      }
    }
  }, [router]);

  useEffect(() => {
    if (!cameraOn) {
      switchOnCamera();
    }
  }, [cameraOn]);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card">
          {router.isReady ? (
            <JobDescription job={job} job_test_schedule={job_test_schedule} />
          ) : null}

          <PolicyRemarksTest />

          {isOverDue == false ? (
            <div className="card-body p-4 border border-dashed border-end-0 border-start-0">
              {confirm == "yes" ? (
                <Accordions
                  id="candidate-description"
                  title="Please fill in your personal data"
                >
                  <CandidateBiodata
                    base_url={base_url}
                    job={job}
                    job_test_schedule={job_test_schedule}
                  />
                </Accordions>
              ) : null}

              <br />
              {isCompleteBio ? (
                dataTest.map((item: any, index: any) => {
                  let canDoTheTest = true;
                  let isCompleteTest = false;
                  // switch (index) {
                  //   case 0:
                  //     isCompleteTest = isCompleteTestFirst ? true : false;
                  //     break;
                  //   case 1:
                  //     canDoTheTest = isCompleteTestFirst ? true : false;
                  //     isCompleteTest = isCompleteTestSecond ? true : false;
                  //     break;
                  //   case 2:
                  //     canDoTheTest = isCompleteTestSecond ? true : false;
                  //     isCompleteTest = isCompleteTestThird ? true : false;
                  //     break;
                  //   case 3:
                  //     canDoTheTest = isCompleteTestThird ? true : false;
                  //     isCompleteTest = isCompleteTestFourth ? true : false;
                  //     break;

                  //   default:
                  //     break;
                  // }
                  return (
                    <>
                      <CandidateTestList
                        loading={loading}
                        data={item}
                        isCompleteBio={isCompleteBio}
                        canDoTheTest={canDoTheTest}
                        isCompleteTest={isCompleteTest}
                        job={job}
                        job_test_schedule={job_test_schedule}
                        candidate={candidate}
                        candidate_applied={candidate_applied}
                        isKraeplinComplete={isKraeplinComplete}
                      />
                    </>
                  );
                })
              ) : (
                <></>
              )}

              {confirm == "no" && cameraOn ? <CameraTestView /> : null}

              <div className="text-end">
                <br />
                {confirm == "yes" ? (
                  <>
                    <p className="text-muted">
                      {isCompleteBio ? (
                        <i>
                          Thanks for complete your biodata and then confirm to
                          HRD to get new link for the test{" "}
                        </i>
                      ) : (
                        <i>Please complete your biodata first </i>
                      )}
                    </p>
                  </>
                ) : isCompleteTest ? (
                  <p className="text-muted">
                    <i className="bx bx-check-circle fs-12 text-success"></i>
                    <i>
                      <label className="text-success">
                        Congratulations, you have completed the test
                      </label>
                    </i>
                  </p>
                ) : (
                  // <button
                  //   type="submit"
                  //   className="btn btn-success w-sm"
                  //   //  onClick={(e: any) => handleSubmit(e)}
                  //   //  onSubmit={(e: any) => handleSubmit(e)}
                  // >
                  //   Submit
                  // </button>
                  <p className="text-muted">
                    <i>Please complete your all test first </i>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="card-body p-4">
                <div className="text-center">
                  <h1 className="display-5 fw-bold">
                    <i>Test sudah selesai atau sudah kadaluwarsa</i>
                  </h1>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateTest;
