import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import DocumentTest from "@/views/report/summary-test-cfit/document/document-test";
import { useRouter } from "next/router";

const SummaryTestCfitDocument = () => {
  const query : any = useRouter().query;
  const base_url = "/report/summary-test-cfit";
  const router = useRouter();

  return (
    <>
      <HeadTitlePage subTitle="Document Test" />
      {
        router.isReady && (
          <DocumentTest base_url={base_url} nik={query.index[0]} iddata={query.index[1]} />
        )
      }
    </>
  );
};

export default SummaryTestCfitDocument;
