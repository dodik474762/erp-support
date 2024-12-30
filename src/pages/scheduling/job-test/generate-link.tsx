import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import GenerateLinkView from "@/views/scheduling/job-test/generate-link-view";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const GenerateLinkPage = () => {
  const base_url = "/scheduling/job-test";
  const session = useSession();
  const [akses, setAkses]: any = useState([]);
  const permission = async () => {
    const permission = await checkPermission(base_url, session);
    if (permission.action.length > 0) {
      setAkses(permission.action);
      console.log(akses);
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
  <HeadTitlePage subTitle="Job Test Generate Link" />
  <GenerateLinkView base_url={base_url} akses={akses} />
  </>;
};

export default GenerateLinkPage;
