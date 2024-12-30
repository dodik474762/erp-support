import ButtonLoading from "@/components/layouts/ButtonLoading";
import Link from "next/link";

const CandidateTestList = (props: any) => {
  const {
    loading,
    isCompleteBio,
    data,
    canDoTheTest,
    isCompleteTest,
    job,
    job_test_schedule,
    candidate,
    candidate_applied,
    isKraeplinComplete = false,
  } = props;

  let linkTest = `/recrutment/candidate-test/candidate-sub-test?category=${data.category}&job=${job}&job_test_schedule=${job_test_schedule}&test=${data.test}&candidate_test=${data.id}&candidate=${candidate}&candidate_applied=${candidate_applied}&readytest=1&confirm=no`;
  switch (data.category) {
    case "TEST_CREPLIN":
      linkTest = `/recrutment/candidate-test/creplin-test?category=${data.category}&job=${job}&job_test_schedule=${job_test_schedule}&test=${data.test}&candidate_test=${data.id}&candidate=${candidate}&candidate_applied=${candidate_applied}&readytest=1&confirm=no`;
      break;

    default:
      break;
  }

  return (
    <>
      <div className="card-body border border-dashed">
        <div className="d-flex">
          <div className="flex-shrink-0 me-3">
            <i className="text-success bx bx-check-circle fs-20"></i>
          </div>
          <div className="flex-grow-1">
            <h5>{data.judul}</h5>
            <p className="text-muted">{data.remarks}</p>
            <div className="text-end">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : isCompleteBio ? (
                canDoTheTest ? (
                  data.status == "COMPLETE" ? (
                    <p className="text-muted text-success w-sm">
                      <i>Test already done {data.updated_at}</i>
                    </p>
                  ) : data.category == "TEST_CREPLIN" ? (
                    <>
                      <Link
                        href={linkTest}
                        type="submit"
                        className="btn btn-success w-sm"
                      >
                        Do Test
                      </Link>
                    </>
                  ) : isKraeplinComplete ? (
                    <Link
                      href={linkTest}
                      type="submit"
                      className="btn btn-success w-sm"
                    >
                      Do Test
                    </Link>
                  ) : (
                    <p className="text-muted">
                      <i>Waiting for doing test</i>
                    </p>
                  )
                ) : (
                  <p className="text-muted">
                    {isCompleteTest ? (
                      <i>Test already done</i>
                    ) : (
                      <i>Waiting for doing test</i>
                    )}
                  </p>
                )
              ) : (
                <p className="text-muted">
                  <i>Please complete your biodata first</i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateTestList;
