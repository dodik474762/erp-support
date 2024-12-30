import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import SettingPermissionViews from "@/views/settings/permissions/permission_views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const SettingPermissionPage = () => {
    const base_url = "/settings/permissions";
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
        <HeadTitlePage subTitle="Permissions" />
        <SettingPermissionViews base_url={base_url} akses={akses}/>
        </>
    )
}

export default SettingPermissionPage;