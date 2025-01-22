import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterPriceTypeViews from "@/views/master/price-type/price-type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterPriceTypePage = () => {
  const base_url = "/master/price-type";
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
  <HeadTitlePage subTitle="Price Type" />
  <MasterPriceTypeViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterPriceTypePage;
