import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import CandidateTestCreplin from "@/views/recrutment/candidate-test/creplin-test/form-creplin-test";
import { useSession } from "next-auth/react";


const CreplinTestPage = () => {
    const base_url = "/recrutment/candidate-test";
    return (
        <>
            <HeadTitlePage subTitle="Recrutment / Creplin Test" />
            <CandidateTestCreplin base_url={base_url}/>
        </>
    );
}

export default CreplinTestPage;