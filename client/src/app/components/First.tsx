import LinkComponent from "@/utilityComponents/LinkComponent";
import FirstImg from "../../../public/assets/svg/coding.svg";
import SecondImg from "../../../public/assets/svg/design.svg";
import ThirdImg from "../../../public/assets/svg/development.svg";
import FourthImg from "../../../public/assets/svg/peer-working.svg";
import ImgHolder from "@/utilityComponents/ImgHolder";
import createRandomNumber from "@/utitlityFunctions/createRandomNumber";

function First() {
  const arr = [FirstImg, SecondImg, ThirdImg, FourthImg];

  const whatsappLink = process.env.WHATSAPP_LINK as string;
  return (
    <div className="first-component">
      <article>
        <h2>
          <span>Design &</span>
          <span>Development</span>
        </h2>
        <p>
          <span>
            We design compelling visual identity that makes you standout among
            competitors.
          </span>
          <span>
            We develop fast, secure and maintainable software that gives your
            customers best user experience.
          </span>
        </p>
        <LinkComponent title="Contact Us" url={whatsappLink} />
      </article>
      <ImgHolder imgHolderClass="img-holder" src={arr[createRandomNumber(3)]} />
    </div>
  );
}

export default First;
