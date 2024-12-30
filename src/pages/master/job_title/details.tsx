import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import JobTitleDetailsViews from "@/views/master/job_title/details/job_title_details_views";

const MasteRJobTitleDetailPage = () => {
  const base_url = "/master/job_title";
  return (
    <>
      <HeadTitlePage subTitle="Job Title" />
      <JobTitleDetailsViews base_url={base_url} />
    </>
  );
};

export default MasteRJobTitleDetailPage;
