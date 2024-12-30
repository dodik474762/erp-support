import Image from "next/image";

const GoogleMapMarker = ({
    text = "",
    lat = 0,
    lng = 0,
    onClick = (e: any) => {},
}) => {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <Image
          src="/assets/images/pin.png"
          width={30}
          height={30}
          fetchPriority="high"
          alt="marker"
          onClick={(e: any) => onClick(e)}
        />
        <div
          style={{
            marginTop: "8px",
            color: "white",
            width: "100px",
            paddingTop: "15px",
            textJustify: "inter-word",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default GoogleMapMarker;
