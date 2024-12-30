import ApiServices from "@/services/api.services";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CandidateSubTestList from "../list/candidate-sub-test-list";
import Link from "next/link";
import JobDescription from "./job-description";
import moment from "moment-timezone";
import PolicyRemarksTest from "./policy-remarks-test";

const CandidateSubTest = (props: any) => {
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

  const fetchDataTest = async () => {
    const req: any = await ApiServices.get(
      base_url,
      "/get-sub-test?test=" + test + "&candidate_test=" + candidate_test
    );
    if (req.is_valid == true) {
      const data = req.data;
      const resultData = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.updated_at = moment(element.updated_at).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
        resultData.push(element);
      }

      setDataTest(resultData);
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
          <PolicyRemarksTest/>
          
          <div className="card-body p-4 border border-dashed border-end-0 border-start-0">
            <br />
            {dataTest.map((item: any, index: any) => {
              let canDoTheTest = true;
              let isCompleteTest = false;
              switch (item.status) {
                case 0:
                  isCompleteTest = item.status == "FINISHED" ? true : false;
                  canDoTheTest = item.status == "ON_GOING" ? true : false;
                  break;
                default:
                  break;
              }
              return (
                <>
                  <CandidateSubTestList
                    loading={loading}
                    data={item}
                    canDoTheTest={canDoTheTest}
                    isCompleteTest={isCompleteTest}
                    job={job}
                    job_test_schedule={job_test_schedule}
                    candidate={candidate}
                    candidate_applied={candidate_applied}
                  />
                </>
              );
            })}

            <div className="text-end">
              <br />
              <Link
                className="btn btn-soft-info waves-effect waves-light"
                href={backUrl}
              >
                Back
              </Link>
              &nbsp; &nbsp;
              {isCompleteTest ? (
                <button
                  type="submit"
                  className="btn btn-success w-sm"
                  //  onClick={(e: any) => handleSubmit(e)}
                  //  onSubmit={(e: any) => handleSubmit(e)}
                >
                  Submit
                </button>
              ) : (
                <p className="text-muted">
                  <br />
                  <i>Please complete your all the test</i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSubTest;
