import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import DepartementDetailsViews from "@/views/master/department/form/form-details";

const DepartmentDetailsPage = () => {
    const base_url = "/master/department";
    return (
        <>
        <HeadTitlePage subTitle="Departement" />
        <DepartementDetailsViews base_url={base_url}/>
        </>
    );
};

export default DepartmentDetailsPage;