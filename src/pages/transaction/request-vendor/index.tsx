import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import RequestVendorViews from "@/views/transaction/request-vendor/request-vendor";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const RequestVendorPage = () => {
  const base_url = "/transaction/request-vendor";
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
  <HeadTitlePage subTitle="Request Vendor" />
  <RequestVendorViews base_url={base_url} akses={akses}/>
  </>;
};

export default RequestVendorPage;
