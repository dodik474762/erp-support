import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import RolesDetailsViews from "@/views/master/roles/details/roles_details_views";

const RolesDetailPage = () => {
    const base_url = "/master/roles";
    return (
        <>
        <HeadTitlePage subTitle="Roles" />
        <RolesDetailsViews base_url={base_url}/>
        </>
    );
};

export default RolesDetailPage;