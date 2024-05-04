import React from "react";
import Top from "../../public/assets/svg/top.svg";
import Left from "../../public/assets/svg/left.svg";
import Bottom from "../../public/assets/svg/bottom.svg";
import ImgHolder from "./ImgHolder";
import { imgHolderType } from "../Types/types";
function LoadingComponent({ isAbsolute = false }) {
  const arr: imgHolderType[] = [
    {
      alt: "top",
      src: Top,
      imgHolderClass: "each-blinker top",
      height: 30,
      width: 30,
    },
    {
      alt: "bottom",
      src: Bottom,
      imgHolderClass: "each-blinker bottom",
      height: 30,
      width: 30,
    },
  ];
  return (
    <div
      className={
        isAbsolute ? "loading-component make-absolute" : "loading-component"
      }
    >
      <section className="horizontal">
        <ImgHolder
          alt={"left"}
          src={Left}
          imgHolderClass="each-blinker left"
          height={30}
          width={30}
        />
      </section>
      <section className="vertical">
        {arr.map((elem: imgHolderType, index: number) => (
          <ImgHolder key={index} {...elem} />
        ))}
      </section>
    </div>
  );
}

export default LoadingComponent;
