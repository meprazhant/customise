"use client";
import React from "react";
import PhoneModal from "./PhoneModal";
import CropImage from "../CropImage";
import EditorMain from "../EditorMain";

function CustomiseMainPhone({ product }) {
  const [cropPic, setCropPic] = React.useState(null);

  return (
    <div className="flex md:flex-col flex-row items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
      {/* <div className="text-lg text-gray-600 mb-8">
        {product?.map((item) => (
          <div key={item.id} className="flex items-center justify-center">
            <PhoneModal data={item} />
          </div>
        ))}
      </div> */}
      <EditorMain id={5} phone={true} />
    </div>
  );
}

export default CustomiseMainPhone;
