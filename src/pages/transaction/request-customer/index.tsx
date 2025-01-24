import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import RequestCustomerViews from "@/views/transaction/request-customer/request-customer-views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const RequestCustomerPage = () => {
  const base_url = "/transaction/request-customer";
  const session = useSession();
  const [akses, setAkses]: any = useState([]);
  const permission = async () => {
    const permission = await checkPermission(base_url, session);
    if (permission.action.length > 0) {
      setAkses(permission.action);
    }
  };

  useEffect(() => {
    if (akses.length > 0) return;
    if (session.status == "authenticated") {      
      permission();
    }
  }, [akses, session.status]);

  return <>
  <HeadTitlePage subTitle="Request Customer" />
  <RequestCustomerViews base_url={base_url} akses={akses}/>
  </>;
};

export default RequestCustomerPage;
