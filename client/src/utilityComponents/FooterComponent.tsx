import Logo from "../../public/assets/svg/logo-2.svg";
import ImgHolder from "./ImgHolder";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Link from "next/link";
function FooterComponent() {
  return (
    <div className="footer-component">
      <ImgHolder
        imgHolderClass="logo-holder"
        src={Logo}
        height={70}
        width={70}
        alt="chiral logo"
      />
      <h3>Want to hire us ?</h3>
      <p>
        <IoPhonePortraitOutline className="icon" />
        <span>+2348165607828</span>
      </p>
      <p>
        <IoLocationSharp className="icon" />
        <span>Funaab Gate, Abeokuta Ogun State Nigeria.</span>
      </p>

      {/* <div className="icon-holder">
        <Link
          target="_blank"
          title="whatsapp link"
          href={process.env.WHATSAPP_LINK || ""}
        >
          <FaWhatsapp className="icon" />
        </Link>
        <Link
          target="_blank"
          title="email link"
          href={process.env.MAIL_LINK || ""}
        >
          <MdEmail className="icon" />
        </Link>
      </div> */}
    </div>
  );
}

export default FooterComponent;
