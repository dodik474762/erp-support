import ExampleFormDetailsViews from "@/views/example/details/example_detail_views";
import { useRouter } from "next/router"

const ExampleDetailPage = () =>{
    const router = useRouter();
    const id = router.query.id as string;
    return (
        <>
            <ExampleFormDetailsViews id={id} />
        </>
    );
}

export default ExampleDetailPage;