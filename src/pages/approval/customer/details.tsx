import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import ApprovalCustomerDetailViews from "@/views/approval/customer/form/form-detail";

const ApprovalCustomerDetailsPage = () => {
  const base_url = "/approval/customer";
  return (
    <>
      <HeadTitlePage subTitle="Approval Request Customer" />
      <ApprovalCustomerDetailViews base_url={base_url} />
    </>
  );
};

export default ApprovalCustomerDetailsPage;
