import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormCandidateTest from "@/views/recrutment/candidate-test/form-test/form-candidate-test";

const FormTestPage = () => {    
  const base_url = "/recrutment/candidate-test";
  return (
    <>
      <HeadTitlePage subTitle="Recrutment / Candidate Test / Form Test" />
      <FormCandidateTest base_url={base_url} />
    </>
  );
};

export default FormTestPage;
