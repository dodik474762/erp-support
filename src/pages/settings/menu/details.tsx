import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import MenuDetailsViews from "@/views/settings/menu/details/menu_details_views";

const SettingMenuDetailPage = () => {
    const base_url = "/settings/menu";
    return (
        <>
        <HeadTitlePage subTitle="Menu" />
        <MenuDetailsViews base_url={base_url}/>
        </>
    )
}

export default SettingMenuDetailPage;