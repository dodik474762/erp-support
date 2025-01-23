import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormCustomerCategoryDetailViews from "@/views/master/customer-category/form/form-detail";

const CustomerCategoryDetailPage = () => {
    const base_url = "/master/customer-category";
    return (
        <>
        <HeadTitlePage subTitle="Customer Category" />
        <FormCustomerCategoryDetailViews base_url={base_url}/>
        </>
    );
};

export default CustomerCategoryDetailPage;