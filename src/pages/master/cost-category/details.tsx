import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormCostCategoryDetailViews from "@/views/master/cost-category/form/form-detail";

const CostCategoryDetailPage = () => {
    const base_url = "/master/cost-category";
    return (
        <>
        <HeadTitlePage subTitle="Cost Category" />
        <FormCostCategoryDetailViews base_url={base_url}/>
        </>
    );
};

export default CostCategoryDetailPage;