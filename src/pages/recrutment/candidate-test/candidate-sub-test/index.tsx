import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import CandidateSubTest from "@/views/recrutment/candidate-test/candidate-sub-test";

const CandidateSubTestPage = () => {
  const base_url = "/recrutment/candidate-test";
  return (
    <>
      <HeadTitlePage subTitle="Recrutment / Candidate Test / Sub Test" />
      <CandidateSubTest base_url={base_url} />
    </>
  );
};
export default CandidateSubTestPage;
