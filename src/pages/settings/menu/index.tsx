import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import SettingMenuViews from "@/views/settings/menu/menu_views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SettingsMenuPage= () => {
    const base_url = "/settings/menu";
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
        <HeadTitlePage subTitle="Menu" />
        <SettingMenuViews base_url={base_url} akses={akses}/>
        </>
    )
}

export default SettingsMenuPage;