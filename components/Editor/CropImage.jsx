"use client";
import React, { useEffect, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"; // Ensure Cropper CSS is imported

function CropImage({ image, setCropedPic, aspect }) {
  const imgref = useRef(null);

  useEffect(() => {
    const cropper = new Cropper(document.getElementById("img"), {
      autoCrop: false,
      aspectRatio: aspect[0] / aspect[1],
      crop(event) {
        saveCrop(event);
      },
      cropend(event) {
        saveCrop(event);
      },
    });
    return () => {
      cropper.destroy();
    };
  }, []);

  function saveCrop(event) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = aspect[0] * 1000;
    canvas.height = aspect[1] * 1000;
    ctx.drawImage(
      imgref.current,
      event.detail.x,
      event.detail.y,
      event.detail.width,
      event.detail.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.toBlob((blob) => {
      setCropedPic(blob);
    });
  }

  return (
    <div className="flex flex-col gap-5 p-2 ">
      <img
        ref={imgref}
        id="img"
        src={
          image ? URL.createObjectURL(image) : "https://via.placeholder.com/200"
        }
        alt="crop"
        style={{ height: "450px", width: "450px" }}
      />
    </div>
  );
}

export default CropImage;
