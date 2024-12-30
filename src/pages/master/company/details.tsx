import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import CompanyDetailViews from "@/views/master/company/form/form-detail-company";

const CompanyDetailPage = () => {
    const base_url = "/master/company";
    return (
        <>
        <HeadTitlePage subTitle="Company" />
        <CompanyDetailViews base_url={base_url}/>
        </>
    );
};

export default CompanyDetailPage;