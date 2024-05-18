import Image from "next/image";
import { imgHolderType } from "../Types/types";
function ImgHolder({
  src,
  imgHolderClass="img-holder",
  alt = "web image",
  width = 200,
  height = 200,
  action,
}: imgHolderType) {
  return (
    <div className={imgHolderClass}>
      {action ? (
        <Image
          className="proj-img"
          onClick={action}
          src={src}
          height={height}
          width={width}
          alt={alt}
          priority={true}
        />
      ) : (
        <Image
          priority={true}
          src={src} 
          height={height}
          width={width}
          alt={alt}
        />
      )}
    </div>
  );
}

export default ImgHolder;
