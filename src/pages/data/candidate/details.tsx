import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormCandidateDetailViews from "@/views/data/candidate/form/form-detail-candidate";

const CandidateDetailPage = () => {
    const base_url = "/data/candidate";
    return (
        <>
        <HeadTitlePage subTitle="Candidate" />
        <FormCandidateDetailViews base_url={base_url}/>
        </>
    );
};

export default CandidateDetailPage;