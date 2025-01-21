import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormGroupTypeDetailViews from "@/views/master/group-type/form/form-detail";

const GroupTypeDetailPage = () => {
    const base_url = "/master/group-type";
    return (
        <>
        <HeadTitlePage subTitle="Group Type" />
        <FormGroupTypeDetailViews base_url={base_url}/>
        </>
    );
};

export default GroupTypeDetailPage;