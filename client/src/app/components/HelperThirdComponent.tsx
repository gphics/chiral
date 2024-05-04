import { briefType, imageType } from "@/Types/types";
import React from "react";
import DefaultImage from "../../../public/assets/PNG/default-img.png";
import ImgHolder from "@/utilityComponents/ImgHolder";
import Link from "next/link";

function HelperThirdComponent({
  name,
  id,
  brief,
  designs,
}: {
  name: string;
  id:string,
  designs: imageType[];
  brief: briefType;
}) {
  // console.log("I AM THE NAME", brief.brandVisuals);
  let imgSrc: any = DefaultImage;
  window.addEventListener("online", (e) => {
  
    if (designs.length) {
      imgSrc = designs[0].url;
    } else if (brief?.brandVisuals?.length) {
      imgSrc = brief.brandVisuals[0].url;
    }
  });

  return (
    <Link href={`/project/${id}`} className="helper-third-component">
      <ImgHolder imgHolderClass="project-img-holder" src={imgSrc} width={200} height={200} alt={name} />
      <article>
        <h4> {name} </h4>
        <p> {brief.jobDescription} </p>
      </article>
    </Link>
  );
}

export default HelperThirdComponent;
