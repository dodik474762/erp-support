import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormDetailQuestionsViews from "@/views/data/questions/form/form-details-questions";

const QuestionsDetailPage = () => {
    const base_url = "/data/questions";
    return (
        <>
        <HeadTitlePage subTitle="Questions" />
        <FormDetailQuestionsViews base_url={base_url}/>
        </>
    );
};

export default QuestionsDetailPage;