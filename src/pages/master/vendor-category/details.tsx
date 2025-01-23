import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormVendorCategoryDetailViews from "@/views/master/vendor-category/form/form-detail";

const VendorCategoryDetailPage = () => {
    const base_url = "/master/vendor-category";
    return (
        <>
        <HeadTitlePage subTitle="Vendor Category" />
        <FormVendorCategoryDetailViews base_url={base_url}/>
        </>
    );
};

export default VendorCategoryDetailPage;