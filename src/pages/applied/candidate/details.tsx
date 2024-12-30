import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormAppliedCandidateDetailViews from "@/views/applied/candidate/form/form-detail-applied-candidate";

const AppliedCandidateDetailPage = () => {
    const base_url = "/applied/candidate";
    return (
        <>
        <HeadTitlePage subTitle="Applied Candidate" />
        <FormAppliedCandidateDetailViews base_url={base_url}/>
        </>
    );
};

export default AppliedCandidateDetailPage;