import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormReplanishmentMethodDetailViews from "@/views/master/replanishment-method/form/form-detail";

const ReplanishmentMethodDetailPage = () => {
    const base_url = "/master/replanishment-method";
    return (
        <>
        <HeadTitlePage subTitle="Replanishment Method" />
        <FormReplanishmentMethodDetailViews base_url={base_url}/>
        </>
    );
};

export default ReplanishmentMethodDetailPage;