"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CropImage from "./CropImage";
import PhoneModal from "./phone/PhoneModal";
import { useCart } from "@/context/cartContext";
import { UploadImage } from "@/functions/UploadImage";

const Designs = [
  {
    image: "https://i.ibb.co/PDMTbdG/image.png",
    title: "airpods",
    aspect: [1, 1],
    id: 1,
    price: 999,
    desc: `Compatible for Apple AirPods 2nd 1st charging case. 0.25mm see-through thin wall allows you to check the indicator status any time. Precise cutouts for easy access to all functions without any interference`,
  },
  {
    image: "https://i.ibb.co/jhxVBv8/MOUSEPAD-TEMPLETE-UPDATED.png",
    title: "mousepads",
    aspect: [1, 0.43],
    id: 2,
    price: 1150,
  },
  {
    image: "https://i.ibb.co/qY1SVXS/laptop.png",
    title: "laptopsleeves",
    aspect: [1, 1],
    id: 3,
    price: 1150,
  },
  {
    image: "https://i.ibb.co/dMxR0Kg/POP-SOCKET-TEPLETE-UPDATED.png",
    title: "popsockets",
    aspect: [1, 1],
    id: 4,
    price: 150,
  },
  {
    image: "https://i.ibb.co/PDMTbdG/image.png",
    title: "phonecases",
    aspect: [0.52, 1],
    id: 5,
    price: 550,
  },
];

function EditorMain({ id, phone, product }) {
  const [image, setImage] = useState(null);
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const editor = document.getElementById("editor");
    if (!!editor) editor.scrollIntoView({ behavior: "smooth" });
  }, []);

  const design = Designs.find((design) => design?.title === id);
  const imgref = useRef(null);

  async function handleAddToCart() {
    if (!image) return alert("Please upload an image");
    setLoading(true);
    const img = await UploadImage(image);
    if (!img.success) {
      setLoading(false);
      return alert("Failed to upload image");
    }
    console.log(img);
    const data = {
      name: design.title,
      qty: 1,
      image: img?.data?.url,
      variant: "custom",
      id: Math.floor(Math.random() * 1000),
      price: design.price,
    };
    addItemToCart(data);
      alert("Item added to cart");
      setImage(null);
      setLoading(false);
  }

  if (!design) return <h1>Design not found</h1>;

  return (
    <div className="flex flex-col gap-5 md:p-10 p-4">
      <div className="flex gap-2 items-center">
        <Link
          href={"/"}
          className="text-gray-400 cursor-pointer hover:text-blue-400 duration-300"
        >
          Home
        </Link>
        <p className="text-gray-400">&gt;</p>
        <p className="text-gray-400">{design?.title}</p>
      </div>

      <div
        id="editor"
        className="
         py-5 flex flex-col md:flex-row items-center justify-center bg-gray-100 gap-4
        "
      >
        {/* preview Screen */}
        <div
          className="
                 md:w-1/2 w-full   rounded-md  bg-white flex justify-center items-center h-full
                "
        >
          <div
            className="relative bg-white  "
            style={{
              width: `${design?.aspect[0] * 500}px`,
            }}
          >
            {(!phone && (
              <div className="flex bg-red-400">
                <img
                  onDoubleClick={() => {
                    document.getElementById("file").click();
                  }
                  }
                  ref={imgref}
                  src={`${design?.image}`}
                  alt="preview"
                  className="z-20 w-full object-contain bg-red-400 "
                  style={{
                    backgroundImage:
                      (!!image && `url(${URL.createObjectURL(image)})`) ||
                      "url(https://i.ibb.co/TqJNrL0/custom-Design.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            )) || (
              // if phone
              <div className="flex justify-center items-center h-full">
                <PhoneModal data={product[0]} />
              </div>
            )}
            <div className="absolute z-30 bottom-0 left-0 w-full bg-purple text-white p-2 rounded-md">
              The Preview Screen may not be accurate. Please check the image
              before ordering
            </div>
          </div>
        </div>

        {/* editor */}
        <div className=" md:w-1/2 w-full  bg-white rounded-md p-2 h-full flex flex-col gap-3    ">
          <div className="flex flex-col gap-5">
            <h1 className="md:text-3xl text-xl font-bold">
              Customise <span className="capitalize ">{design?.title}</span>
            </h1>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="text-black/80 md:text-3xl text-xl font-bold ">
              Rs: {design?.price}
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>

            {/* write a short description */}
            {(!!design?.desc && (
              <p className="text-sm text-gray-900/80">{design?.desc}</p>
            )) || (
              <p className="text-sm text-gray-700/80 ">
                How to customise your {design?.title}? <br />
                1. Click on the upload button below <br />
                2. Resize and adjust the image <br />
                3. Upload your image <br />
                4. Click on the Order button <br />
                5. Fill in the details and place the order
              </p>
            )}

            {/* images */}
            <div className="flex gap-2 flex-col">
              {!!image && (
                <div className="flex flex-col">
                  <p className="text-gray-900">Choosen Design</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="custom"
                    className="w-20 h-20 object-cover border border-transparent"
                    style={{
                      aspectRatio: `${design?.aspect[0]}/${design?.aspect[1]}`,
                    }}
                  />
                  <p className="text-gray-900">
                    Be sure to maintain the aspect ratio of the image
                    <span className="text-red-500">
                      {" "}
                      {design?.aspect[0]}:{design?.aspect[1]}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center p-5 border-dashed rounded-md ">
              <input
                disabled={loading}
                onChange={(e) => {
                  if (e.target.files.length === 0) return;
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="file"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="file"
                className="
                          md:w-auto w-full flex items-center justify-center bg-purple text-white px-5 py-2 rounded-md cursor-pointer hover:bg-purple/80 duration-300
                          "
              >
                <svg
                  className="w-6 h-6 inline-block mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      className="upDown"
                      d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                      stroke="#ffffff5c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
                Upload Image
              </label>
              {!!image && (
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="
                          md:w-auto w-full bg-green-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-green-800 duration-300
                          "
                >
                  <svg
                    className="w-6 h-6 inline-block mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  {loading ? "Adding to cart..." : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
     {(loading) && <div className="fixed z-50 top-0 left-0 h-full w-full bg-black/50 backdrop-grayscale flex justify-center items-center">
        <div className="bg-white p-5 rounded-md shadow-md flex-col flex gap-3">
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/
              2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Adding Items to cart...</h1>
        </div>
      </div>}
    </div>
  );
}

export default EditorMain;
