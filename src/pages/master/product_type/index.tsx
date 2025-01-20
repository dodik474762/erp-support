import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterProductTypeViews from "@/views/master/product_type/product_type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterProductTypePage = () => {
  const base_url = "/master/product-type";
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
  <HeadTitlePage subTitle="Product Type" />
  <MasterProductTypeViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterProductTypePage;
