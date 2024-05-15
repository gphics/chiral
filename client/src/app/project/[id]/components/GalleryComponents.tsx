import { imageType } from "@/Types/types";
import React, { useEffect, useState } from "react";
import ImgComponent from "../../../../utilityComponents/ImgComponent";
import { GrNext, GrPrevious } from "react-icons/gr";
function GalleryComponents({
  srcs,
  title,
  width = 250,
  height = 250,
}: {
  title: string;
  srcs: imageType[];
  width?: number;
  height?: number;
}) {
  const [imgNums, setImgNums] = useState({ current: 0, total: 0 });
  function mainAction(num?: number) {
    const elems = document.querySelectorAll(".proj-img-holder");

    elems.forEach((elem, i) => {
      if (num || num === 0) {
        // @ts-ignore
        elem.style.transform = `translateY(${(i - num) * 100}%)`;
      } else {
        // @ts-ignore
        elem.style.transform = `translateY(${i * 100}%)`;
      }
    });
  }
  function btnClickHandler(e: any) {
    const { name } = e.target;
    const { current, total } = imgNums;
    let newCurrent = current;
    if (name === "prev-btn") {
      newCurrent = current === 0 ? total : current - 1;
      setImgNums((prev) => ({ ...prev, current: newCurrent }));
    } else {
      newCurrent = current === total ? 0 : current + 1;
      setImgNums((prev) => ({ ...prev, current: newCurrent }));
    }
    mainAction(newCurrent);
  }
  useEffect(() => {
    mainAction();
    setImgNums((prev) => ({ ...prev, total: srcs.length - 1 }));
  }, []);
  return (
    <div className="gallery-component">
      <h3> {title} </h3>
      <section className="gallery">
        <div className="images">
          {srcs.map((elem: imageType, index: number) => {
            return (
              <ImgComponent
                width={width}
                height={height}
                key={index}
                url={elem.url}
              />
            );
          })}
        </div>
        <div className="ctrl-holder">
          <button onClick={btnClickHandler} name="prev-btn" type="button">
            {""}
            <GrPrevious />
          </button>
          <button onClick={btnClickHandler} name="next-btn" type="button">
            {""}
            <GrNext />
          </button>
        </div>
      </section>
    </div>
  );
}

export default GalleryComponents;
