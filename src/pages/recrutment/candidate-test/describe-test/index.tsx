import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import CandidateTestDescribe from "@/views/recrutment/candidate-test/describe-test/describe-test-candidate";
import { useSession } from "next-auth/react";


const CandidateDescribeTestPage = () => {
    const base_url = "/recrutment/candidate-test";
    return (
        <>
            <HeadTitlePage subTitle="Recrutment / Candidate Test" />
            <CandidateTestDescribe base_url={base_url}/>
        </>
    );
}

export default CandidateDescribeTestPage;