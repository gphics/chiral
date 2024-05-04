
import Image from "next/image";
import { imgHolderType } from "../Types/types";
function ImgHolder({
  src,
  imgHolderClass,
  alt = "web image",
  width = 200,
  height = 200,
  action,
}: imgHolderType) {
  return (
    <div className={imgHolderClass}>
      {action ? (
        <Image
          onClick={action}
          src={src}
          height={height}
          width={width}
          alt={alt}
        />
      ) : (
        <Image
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
