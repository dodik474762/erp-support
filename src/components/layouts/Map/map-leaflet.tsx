import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
// import 'leaflet/dist/leaflet.css'

const MapLeaflet = () => {
  const greenIcon = L.icon({
    iconUrl: "/assets/images/pin.png",
    // shadowUrl: "/assets/images/pin.png",

    iconSize: [38, 38], // size of the icon
    // shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <>
      <MapContainer
        center={[-8.0947823, 112.1446564]}
        zoom={11}
        scrollWheelZoom={false}
        className="leaflet-map"
        style={{ height: "800px",}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXRwcm9ncmFtbWVybXRzIiwiYSI6ImNsaGp6anByMDBtc3gza3VwNjRwNWk2N2sifQ.aaXm2ry5dSHPlmfNSCkr9w"
          id="mapbox/streets-v11"
          tileSize={512}
          zoomOffset={-1}
        />
        <Marker position={[-8.0947823, 112.1446564]} icon={greenIcon}>
          <Popup>
            Posisi <br /> 
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapLeaflet;
