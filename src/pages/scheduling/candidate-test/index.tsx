import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import CandidateTestView from "@/views/scheduling/candidate-test/candidate-test-views";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CandidateTestPage = () => {
  const base_url = "/scheduling/candidate-test";
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
  <HeadTitlePage subTitle="Candidate Test" />
  <CandidateTestView base_url={base_url} akses={akses} />
  </>;
};

export default CandidateTestPage;
