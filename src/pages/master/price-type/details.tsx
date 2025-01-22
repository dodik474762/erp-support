import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormPriceTypeDetailViews from "@/views/master/price-type/form/form-detail";

const PriceTypeDetailPage = () => {
    const base_url = "/master/price-type";
    return (
        <>
        <HeadTitlePage subTitle="Price Type" />
        <FormPriceTypeDetailViews base_url={base_url}/>
        </>
    );
};

export default PriceTypeDetailPage;