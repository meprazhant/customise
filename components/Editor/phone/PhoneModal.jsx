"use client";
import React from "react";

function PhoneModal({ data, cropedPic }) {
  return (
    <div
      className="rounded-xl border border-black bg-gray-400 p-4
        h-[400px]   aspect-[9/17]
    "
      style={{
        backgroundImage: !!cropedPic
          ? `url(${URL.createObjectURL(cropedPic)})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-20 h-20 object-cover rounded-md"
      />
    </div>
  );
}

export default PhoneModal;
