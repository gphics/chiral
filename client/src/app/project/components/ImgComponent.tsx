import { briefType, imageType } from "@/Types/types";
import DefaultImg from "../../../../public/assets/PNG/default-img.png";
import { StaticImageData } from "next/image";
import ImgHolder from "@/utilityComponents/ImgHolder";
function ImgComponent({
  brief,
  designs,
}: {
  brief: briefType;
  designs: imageType[] | undefined;
}) {
  let imgSrc: StaticImageData | string = DefaultImg;
  if (!navigator.onLine) {
    imgSrc = DefaultImg;
  } else if (designs?.length) {
    imgSrc = designs[0].url;
  } else if (brief?.brandVisuals?.length) {
    imgSrc = brief.brandVisuals[0].url;
  }
  return (
    <ImgHolder
      src={imgSrc}
      imgHolderClass="img-holder"
      alt="project image"
      width={150}
      height={150}
    />
  );
}

export default ImgComponent;
