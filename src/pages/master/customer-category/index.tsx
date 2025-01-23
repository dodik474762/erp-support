import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterCustomerCategoryViews from "@/views/master/customer-category/customer-category";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterProductTypePage = () => {
  const base_url = "/master/customer-category";
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
  <HeadTitlePage subTitle="Customer Category" />
  <MasterCustomerCategoryViews base_url={base_url} akses={akses} />
  </>;
};

export default MasterProductTypePage;
