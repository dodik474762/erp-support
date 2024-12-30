import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormDetailCandidateTestViews from "@/views/scheduling/candidate-test/form/form-detail-candidate-test";

const CandidateTestDetailPage = () => {
    const base_url = "/scheduling/candidate-test";
    return (
        <>
        <HeadTitlePage subTitle="Candidate Test" />
        <FormDetailCandidateTestViews base_url={base_url}/>
        </>
    );
};

export default CandidateTestDetailPage;