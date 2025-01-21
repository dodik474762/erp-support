import HeadTitlePage from "@/components/layouts/HeadTitlePage";
import FormVolumeTypeDetailViews from "@/views/master/volume-type/form/form-detail";

const VolumeTypeDetailPage = () => {
    const base_url = "/master/volume-type";
    return (
        <>
        <HeadTitlePage subTitle="Volume Type" />
        <FormVolumeTypeDetailViews base_url={base_url}/>
        </>
    );
};

export default VolumeTypeDetailPage;