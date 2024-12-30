import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import PermissionDetailViews from "@/views/settings/permissions/details/permission_details_views";


const SettingPermissionDetailsPage = () => {
    const base_url = "/settings/permissions";
    return (
        <>
        <HeadTitlePage subTitle="Permissions" />
        <PermissionDetailViews base_url={base_url}/>
        </>
    )
}

export default SettingPermissionDetailsPage;