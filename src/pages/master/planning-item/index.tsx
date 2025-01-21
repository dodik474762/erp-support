import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterPlanningItemViews from "@/views/master/planning-item/planning_item";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterPlanningItemPage = () => {
  const base_url = "/master/planning-item";
  const session = useSession();
  const [akses, setAkses]: any = useState([]);
  const permission = async () => {
    const permission = await checkPermission(base_url, session);
    if (permission.action.length > 0) {
      setAkses(permission.action);
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
  <HeadTitlePage subTitle="Planning Item" />
  <MasterPlanningItemViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterPlanningItemPage;
