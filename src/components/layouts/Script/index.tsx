import Script from "next/script";

const ScriptComponent = () => {
  return (
    <>
      <Script type="text/javascript" src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
      <Script type="text/javascript" src="/assets/libs/simplebar/simplebar.min.js"></Script>
      <Script type="text/javascript" src="/assets/libs/node-waves/waves.min.js"></Script>
      <Script type="text/javascript" src="/assets/libs/feather-icons/feather.min.js"></Script>
      <Script type="text/javascript" src="/assets/libs/leaflet/leaflet.js"></Script>
      <Script type="text/javascript" src="/assets/js/app.js"></Script>
    </>
  );
};

export default ScriptComponent;
