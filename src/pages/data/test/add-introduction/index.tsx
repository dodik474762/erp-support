
import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import FormIntroductionTestViews from "@/views/data/test/form/introduction/form-introduction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TestAddIntroductionTestPage = () => {
  const base_url = "/data/test";
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

  return (
    <>
      <>
        <HeadTitlePage subTitle="Introduction Test" />
        <FormIntroductionTestViews base_url={base_url} />
      </>
    </>
  );
};

export default TestAddIntroductionTestPage;