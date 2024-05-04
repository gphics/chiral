"use client";
import Link from "next/link";
import Logo from "../../public/assets/svg/logo-1.svg";
import ImgHolder from "./ImgHolder";

import { CgMenuRightAlt } from "react-icons/cg";
import { linkArrType } from "../Types/types";
import LinkComponent from "./LinkComponent";
function NavigationComponent() {
  const toggleLinkHolder = (target: any = null) => {
    const linkHolder = document.querySelector(".link-holder");
    if (target && target === linkHolder) {
      linkHolder?.classList.toggle("hide");
    } else if (!target) {
      linkHolder?.classList.toggle("hide");
    }
  };

  const arr: linkArrType[] = [
    { title: "Home", url: "/", action: toggleLinkHolder },
    { title: "Project", url: "/project", action: toggleLinkHolder },
    { title: "Services", url: "/services", action: toggleLinkHolder },
    { title: "Brief", url: "/brief", action: toggleLinkHolder },
  ];

  return (
    <div className="navigation-component">
      <Link className="logo-holder-link" title="Home" href="/">
        <ImgHolder
          src={Logo}
          alt="chiral-logo"
          width={70}
          height={70}
          imgHolderClass="logo-holder"
        />
      </Link>
      <CgMenuRightAlt
        onClick={() => {
          toggleLinkHolder();
        }}
        className="menu-bar"
      />
      <section
        onClick={(e) => {
          toggleLinkHolder(e.target);
        }}
        className="link-holder hide"
      >
        {arr.map((elem: linkArrType, index: number) => (
          <LinkComponent {...elem} key={index} />
        ))}
      </section>
    </div>
  );
}

export default NavigationComponent;
