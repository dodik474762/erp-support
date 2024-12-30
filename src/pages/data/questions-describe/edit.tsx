import AlertMessage from "@/components/layouts/Alert/alert.message";
import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import FormQuestionsDescribeViews from "@/views/data/questions-describe/form/form-questions-desc";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const QuestionsDescribeEditPage = () => {
  const base_url = "/data/questions-describe";
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
      {akses.includes("update") ? (
        <>
        <HeadTitlePage subTitle="Questions Describe" />
        <FormQuestionsDescribeViews base_url={base_url}/>
        </>
      ) : (
        <>
          <AlertMessage message="Anda Tidak Mempunyai Akses Untuk Menu Ini"/>
        </>
      )}
    </>
  );
};

export default QuestionsDescribeEditPage;
