import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraTestView = () => {
  const webcamRef: any = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); // initialize it

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <Image src={imgSrc} alt="webcam" width={600} height={600} />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default CameraTestView;
