import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import UnitViews from "@/views/master/unit/unit-views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UnitPage = () => {
  const base_url = "/master/unit";
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
  <HeadTitlePage subTitle="Unit" />
  <UnitViews base_url={base_url} akses={akses} />
  </>;
};

export default UnitPage;
