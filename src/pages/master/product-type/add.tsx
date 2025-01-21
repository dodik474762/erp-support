import AlertMessage from "@/components/layouts/Alert/alert.message";
import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import { checkPermission } from "@/utility/permission";
import FormProductTypeViews from "@/views/master/product-type/form/form-product-type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProductTypePage = () => {
  const base_url = "/master/product-type";
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
    if (session.status == 'authenticated') {      
      permission();
    }
  }, [akses, session.status]);

  return (
    <>
      {akses.includes("create") ? (
        <>
        <HeadTitlePage subTitle="Product Type" />
        <FormProductTypeViews base_url={base_url}/>
        </>
      ) : (
        <>
          <AlertMessage message="Anda Tidak Mempunyai Akses Untuk Menu Ini" />
        </>
      )}
    </>
  );
};

export default ProductTypePage;
