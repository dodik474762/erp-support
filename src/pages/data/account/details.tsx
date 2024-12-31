import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import AccountDetailsViews from "@/views/data/account/form/form-details";

const AccountDetailsPage = () => {
    const base_url = "/data/account";
    return (
        <>
        <HeadTitlePage subTitle="Account" />
        <AccountDetailsViews base_url={base_url}/>
        </>
    );
};

export default AccountDetailsPage;