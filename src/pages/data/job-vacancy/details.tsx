import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormJobDetailViews from "@/views/data/job-vacancy/form/form-detail-job";

const JobDetailPage = () => {
    const base_url = "/data/job-vacancy";
    return (
        <>
        <HeadTitlePage subTitle="Job" />
        <FormJobDetailViews base_url={base_url}/>
        </>
    );
};

export default JobDetailPage;