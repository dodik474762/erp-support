import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormDetailSubTestViews from "@/views/data/test/form/form-detail-subtest";

const JobDetailPage = () => {
    const base_url = "/data/test";
    return (
        <>
        <HeadTitlePage subTitle="Sub Test" />
        <FormDetailSubTestViews base_url={base_url}/>
        </>
    );
};

export default JobDetailPage;