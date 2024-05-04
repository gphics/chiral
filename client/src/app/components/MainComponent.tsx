import ImgHolder from "@/utilityComponents/ImgHolder";
import Img from "../../../public/uploads/site-image.jpeg";

function MainComponent() {
    return <div className="main-component">
      <ImgHolder src={Img} height={200} width={200} />
  </div>;
}

export default MainComponent;
