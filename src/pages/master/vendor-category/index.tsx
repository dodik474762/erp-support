import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterVendorCategoryViews from "@/views/master/vendor-category/vendor-category";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterVendorCategoryPage = () => {
  const base_url = "/master/vendor-category";
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
  <HeadTitlePage subTitle="Vendor Category" />
  <MasterVendorCategoryViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterVendorCategoryPage;
