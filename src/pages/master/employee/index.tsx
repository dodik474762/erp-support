import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import MasterEmployeeViews from "@/views/master/employee/employee_views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MasterEmployeePage = () => {
  const base_url = "/master/employee";
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
  <HeadTitlePage subTitle="Employee" />
  <MasterEmployeeViews base_url={base_url} akses={akses}/>
  </>;
};

export default MasterEmployeePage;
