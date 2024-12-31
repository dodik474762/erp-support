import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import DepartementViews from "@/views/master/department/departemen-views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DepartementPage= () => {
    const base_url = "/master/department";
    const session = useSession();
    const [akses, setAkses]: any = useState([]);
    const permission = async () => {
      const permission = await checkPermission(base_url, session);
      if (permission.action.length > 0) {
        // console.log(permission.action);
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

    return (
        <>
        <HeadTitlePage subTitle="Departement" />
        <DepartementViews base_url={base_url} akses={akses}/>
        </>
    )
}

export default DepartementPage;