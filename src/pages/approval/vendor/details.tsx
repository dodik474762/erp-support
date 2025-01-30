import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import ApprovalVendorDetailViews from "@/views/approval/vendor/form/form-detail";

const ApprovalVendoretailsPage = () => {
  const base_url = "/approval/vendor";
  return (
    <>
      <HeadTitlePage subTitle="Approval Request Vendor" />
      <ApprovalVendorDetailViews base_url={base_url} />
    </>
  );
};

export default ApprovalVendoretailsPage;
