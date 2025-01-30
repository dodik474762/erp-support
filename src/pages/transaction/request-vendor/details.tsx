import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import RequestVendorDetailViews from "@/views/transaction/request-vendor/form/form-detail";

const RequestVendorDetailsPage = () => {
    const base_url = "/transaction/request-vendor";
    return (
        <>
        <HeadTitlePage subTitle="Request Vendor" />
        <RequestVendorDetailViews base_url={base_url}/>
        </>
    );
};

export default RequestVendorDetailsPage;