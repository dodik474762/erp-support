import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import UnitDetailsViews from "@/views/master/unit/details/unit-details-views";

const UnitDetailPage = () => {
    const base_url = "/master/unit";
    return (
        <>
        <HeadTitlePage subTitle="Unit" />
        <UnitDetailsViews base_url={base_url}/>
        </>
    );
};

export default UnitDetailPage;