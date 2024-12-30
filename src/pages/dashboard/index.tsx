import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import DashboardViews from "@/views/dashboard/dashboard_views";

const DashboardPage = () =>{
    return (
        <>
        <HeadTitlePage subTitle="Dashboard" />
        <DashboardViews/>
        </>
    )
}
export default DashboardPage;