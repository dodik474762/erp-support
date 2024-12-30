
import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormSummaryTestCfitDetailViews from "@/views/report/summary-test-cfit/form/summary-test-cfit-details";

const SummaryTestCfitDetailPage = () => {
    const base_url = "/report/summary-test-cfit";
    return (
        <>
        <HeadTitlePage subTitle="Summary Test CFIT" />
        <FormSummaryTestCfitDetailViews base_url={base_url}/>
        </>
    );
};

export default SummaryTestCfitDetailPage;