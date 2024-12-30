import ExampleFormEditViews from "@/views/example/edit/example_edit_views";
import { useRouter } from "next/router";

const ExampleEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <>
      <ExampleFormEditViews id={id} />
    </>
  );
};

export default ExampleEditPage;
