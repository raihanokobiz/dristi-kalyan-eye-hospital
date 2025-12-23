"use client";

// import Image from "next/image";
import React, { CSSProperties } from "react";
// import loader from "@/assets/loader/file.png";
import { BeatLoader } from "react-spinners";


const Loading = () => {
  // let [color, setColor] = useState("#ffffff");
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="flex items-center justify-center">
        <BeatLoader color="#1e6a39" />
      </div>
    </div>
  );
};

export default Loading;
