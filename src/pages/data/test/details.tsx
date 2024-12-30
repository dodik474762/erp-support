import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormDetailTestViews from "@/views/data/test/form/form-detail-test";

const JobDetailPage = () => {
    const base_url = "/data/test";
    return (
        <>
        <HeadTitlePage subTitle="Test" />
        <FormDetailTestViews base_url={base_url}/>
        </>
    );
};

export default JobDetailPage;