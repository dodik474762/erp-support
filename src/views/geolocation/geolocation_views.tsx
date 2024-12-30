import GoogleMapMarker from "@/components/layouts/MapMarker/googlemap-marker";
import PageTitle from "@/components/layouts/PageTitle";
import GoogleMapReact from "google-map-react";

const GeoLocationViews = () => {
  const defaultProps = {
    center: {
      lat: -8.0947823,
      lng: 112.1446564,
    },
    zoom: 11,
  };

  return (
    <>
      <PageTitle titlePage="Geo Location" subTitle="Position " />
      {/* // Important! Always set the container height explicitly */}
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCmToM7OJEDGGga4hhYFtBNMghQrbZoYA8" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <GoogleMapMarker
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="Posisi Saya "
          />
        </GoogleMapReact>
      </div>
    </>
  );
};
export default GeoLocationViews;
