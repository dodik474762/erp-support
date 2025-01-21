import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterSubsidaryViews from "@/views/master/subsidiary/subsidiary";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterSubsidiaryPage = () => {
  const base_url = "/master/subsidiary";
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
  <HeadTitlePage subTitle="Subsidiary" />
  <MasterSubsidaryViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterSubsidiaryPage;
