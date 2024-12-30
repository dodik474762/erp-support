import ButtonLoading from "@/components/layouts/ButtonLoading";
import Link from "next/link";

const CandidateSubTestList = (props: any) => {
  const {
    loading,
    isCompleteBio = true,
    data,
    canDoTheTest,
    isCompleteTest,
    job,
    job_test_schedule,
    candidate,
    candidate_applied,
  } = props;

  let linkFormTest = `/recrutment/candidate-test/form-test?category=${data.category}&job=${job}&job_test_schedule=${job_test_schedule}&test=${data.test}&test_sub=${data.test_sub}&candidate_test=${data.candidate_test}&candidate_test_sub=${data.id}&candidate=${candidate}&candidate_applied=${candidate_applied}&confirm=no&readytest=1`;
  switch (data.category) {
    case "TEST_CHAR":
      linkFormTest = `/recrutment/candidate-test/describe-test?category=${data.category}&job=${job}&job_test_schedule=${job_test_schedule}&test=${data.test}&test_sub=${data.test_sub}&candidate_test=${data.candidate_test}&candidate_test_sub=${data.id}&candidate=${candidate}&candidate_applied=${candidate_applied}&confirm=no&readytest=1`;
      break;

    default:
      break;
  }

  return (
    <>
      <div className="border border-dashed card-body">
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
                  ) : (
                    <Link
                      href={linkFormTest}
                      type="submit"
                      className="btn btn-success w-sm"
                    >
                      Do Test
                    </Link>
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

export default CandidateSubTestList;
