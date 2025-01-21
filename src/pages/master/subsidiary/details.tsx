import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormSubsidiaryDetailViews from "@/views/master/subsidiary/form/form-detail";

const SubsidiaryDetailPage = () => {
    const base_url = "/master/subsidiary";
    return (
        <>
        <HeadTitlePage subTitle="Subsidiary" />
        <FormSubsidiaryDetailViews base_url={base_url}/>
        </>
    );
};

export default SubsidiaryDetailPage;