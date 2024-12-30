import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import EmployeeDetailsViews from "@/views/master/employee/details/employee_details_views";


const MasterEmployeeDetailsPage = () => {
    const base_url = "/master/employee"
    return (
        <>
        <HeadTitlePage subTitle="Employee" />
        <EmployeeDetailsViews base_url={base_url}/>
        </>
    )
};

export default MasterEmployeeDetailsPage;