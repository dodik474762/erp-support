import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import ApprovalItemDetailsViews from "@/views/approval/item/form/form-details";

const ApprovalItemDetailsPage = () => {
    const base_url = "/approval/item";
    return (
        <>
        <HeadTitlePage subTitle="Approval Request Item" />
        <ApprovalItemDetailsViews base_url={base_url}/>
        </>
    );
};

export default ApprovalItemDetailsPage;