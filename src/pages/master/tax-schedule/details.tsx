import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormTaxScheduleDetailViews from "@/views/master/tax-schedule/form/form-detail";

const TaxScheduleDetailPage = () => {
    const base_url = "/master/tax-schedule";
    return (
        <>
        <HeadTitlePage subTitle="Tax Schedule" />
        <FormTaxScheduleDetailViews base_url={base_url}/>
        </>
    );
};

export default TaxScheduleDetailPage;