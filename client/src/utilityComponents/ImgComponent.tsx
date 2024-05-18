import { briefType, imageType } from "@/Types/types";
import DefaultImg from "../../public/assets/PNG/default-img.png";
import { StaticImageData } from "next/image";
import ImgHolder from "@/utilityComponents/ImgHolder";
function ImgComponent({
  brief,
  designs,
  url,
  width = 150,
  height = 150,
  onClick
}: {
  brief?: briefType;
  url?: string;
  designs?: imageType[] | undefined;
  width?: number;
    height?: number;
  onClick?:(e:any)=>void
}) {
  let imgSrc: StaticImageData | string = DefaultImg;
  if (url && navigator.onLine) {
    imgSrc = url;
  } else if (!url && designs?.length) {
    imgSrc = designs[0].url;
  } else if (!url && brief?.brandVisuals?.length) {
    imgSrc = brief.brandVisuals[0].url;
  }

  return (
    <ImgHolder
      src={imgSrc}
      imgHolderClass="proj-img-holder"
      alt="project image"
      width={width}
      height={height}
      action={onClick}
    />
  );
}

export default ImgComponent;
