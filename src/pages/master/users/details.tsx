import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import UsersDetailsViews from "@/views/master/users/details/users_detail_views"

const MasterUserDetailsPage = () => {
    const base_url = "/master/users"
    return (
        <>
        <HeadTitlePage subTitle="Users" />
        <UsersDetailsViews base_url={base_url}/>
        </>
    )
}

export default MasterUserDetailsPage;