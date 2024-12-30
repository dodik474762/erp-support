import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormDetailQuestionsDescribeViews from "@/views/data/questions-describe/form/form-detail-questions-desc";

const QuestionsDescribeDetailPage = () => {
    const base_url = "/data/questions-describe";
    return (
        <>
        <HeadTitlePage subTitle="Questions Describe" />
        <FormDetailQuestionsDescribeViews base_url={base_url}/>
        </>
    );
};

export default QuestionsDescribeDetailPage;