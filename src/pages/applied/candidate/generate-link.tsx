import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import GenerateLinkTestCandidateView from "@/views/applied/candidate/generate_link_test_candidate";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const GenerateLinkCandidateTestPage = () => {
  const base_url = "/applied/candidate";
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
    if (akses.length == 0) {
      if (session.status == "authenticated") {
        permission();
      }
    }
  }, [akses, session.status]);

  return (
    <>
      <HeadTitlePage subTitle="Candidate Test Generate Link" />
      <GenerateLinkTestCandidateView base_url={base_url} akses={akses} />
    </>
  );
};

export default GenerateLinkCandidateTestPage;
