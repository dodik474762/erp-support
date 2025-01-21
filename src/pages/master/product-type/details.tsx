import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormProductTypeDetailViews from "@/views/master/product-type/form/form-details";

const ProductTypeDetailPage = () => {
    const base_url = "/master/product-type";
    return (
        <>
        <HeadTitlePage subTitle="Product Type" />
        <FormProductTypeDetailViews base_url={base_url}/>
        </>
    );
};

export default ProductTypeDetailPage;