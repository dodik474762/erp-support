import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import RequestCustomerDetailViews from "@/views/transaction/request-customer/form/form-detail";

const RequestCustomerDetailsPage = () => {
    const base_url = "/transaction/request-customer";
    return (
        <>
        <HeadTitlePage subTitle="Request Customer" />
        <RequestCustomerDetailViews base_url={base_url}/>
        </>
    );
};

export default RequestCustomerDetailsPage;