import EditorMain from "@/components/Editor/EditorMain";
import CustomiseMainPhone from "@/components/Editor/phone/CustomiseMainPhone";
import React from "react";

async function getCustomise() {
  const res = await fetch("http://localhost:3000/api/customise", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function page({ params }) {
  const { id } = await params;
  const sublinks = [
    "airpods",
    "mousepads",
    "laptopsleeves",
    "popsockets",
    "phonecases",
  ];
  if (!sublinks.includes(id)) {
    throw new Error("The page you are looking for does not exist");
  }

  let product = [];

  if (id === "phonecases") {
    const data = await getCustomise();
    product = data?.data;
  }

  return (
    <div>
      {(id !== "phonecases" && <EditorMain id={id} />) || (
        <EditorMain id={id} product={product} phone={true} />
      )}
    </div>
  );
}

export default page;
