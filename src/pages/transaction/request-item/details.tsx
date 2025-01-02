import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import RequestItemDetailsViews from "@/views/transaction/request-item/form/form-details";

const RequestItemDetailsPage = () => {
    const base_url = "/transaction/request-item";
    return (
        <>
        <HeadTitlePage subTitle="Request Item" />
        <RequestItemDetailsViews base_url={base_url}/>
        </>
    );
};

export default RequestItemDetailsPage;