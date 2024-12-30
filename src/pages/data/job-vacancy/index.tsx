import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import JobView from "@/views/data/job-vacancy/job-view";
import MasterRolesViews from "@/views/master/roles/roles_views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const JobPage = () => {
  const base_url = "/data/job-vacancy";
  const session = useSession();
  const [akses, setAkses]: any = useState([]);
  const permission = async () => {
    const permission = await checkPermission(base_url, session);
    if (permission.action.length > 0) {
      setAkses(permission.action);
      console.log(akses);
    }
  };

  useEffect(() => {
    if(akses.length == 0){
      if (session.status == 'authenticated') {
        permission();
      }        
    }
  }, [akses, session.status]);

  return <>
  <HeadTitlePage subTitle="Job" />
  <JobView base_url={base_url} akses={akses} />
  </>;
};

export default JobPage;
