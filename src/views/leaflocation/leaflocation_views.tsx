import PageTitle from "@/components/layouts/PageTitle";
import dynamic from "next/dynamic";


const LeafLocationViews = () => {
  const MapLeaflet = dynamic(
    () => import("../../components/layouts/Map/map-leaflet"),
    { ssr: false }
  );

  return (
    <>
      <PageTitle titlePage="Leaf Location" subTitle="Position " />

      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="tasksList">
            <div className="card-body">
              <div>
                <MapLeaflet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeafLocationViews;
