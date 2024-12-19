import Lottie from "lottie-react";
import file from "./../../../../public/nf.json";

const NotSelectedFile = () => {
  return (
    <div className="center flex-1 flex-col rounded border-2 border-black bg-white p-3 shadow-2xl">
      <Lottie
        className="h-auto w-full max-w-[600px]" // Responsive width and height
        animationData={file}
      />
      <h3>Please create a file and select it.</h3>
    </div>
  );
};

export default NotSelectedFile;
