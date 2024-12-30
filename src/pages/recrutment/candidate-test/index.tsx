import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import CandidateTest from "@/views/recrutment/candidate-test/candidate-test";
import { useSession } from "next-auth/react";


const CandidateTestPage = () => {
    const base_url = "/recrutment/candidate-test";
    return (
        <>
            <HeadTitlePage subTitle="Recrutment / Candidate Test" />
            <CandidateTest base_url={base_url}/>
        </>
    );
}

export default CandidateTestPage;