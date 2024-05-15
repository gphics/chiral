import { imageType } from "@/Types/types"
import Image from "next/image"
import DefaultImg from "../../public/assets/PNG/default-img.png"

function ImgRenderer({arr, title}:{arr:imageType[], title:string}) {
  return (
    <div className="img-renderer">
      <h3> {title} </h3>
      <section>
        {arr.map((elem, index: number) => (
          <Single key={index} url={elem.url} />
        ))}
      </section>
    </div>
  );
}

function Single({ url }: { url: string }) {
  let src = url
  if (!navigator.onLine) {
    // @ts-ignore
    src = DefaultImg
  }
  // @ts-ignore
  return <Image height={0} width={500}  src={src} alt="image" />
}
export default ImgRenderer