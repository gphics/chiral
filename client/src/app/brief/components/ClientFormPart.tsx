import { briefFormArrObjType } from "@/Types/types";
import InputComponent from "@/utilityComponents/InputComponent";
import {useEffect} from "react";

function ClientFormPart({ arr }: { arr: briefFormArrObjType[] }) {
  function scroller() {
    const headX = document.querySelector(".form-nav");
    headX?.scrollIntoView();
    // @ts-ignore
    // headX.autofocus = true;
  }
  useEffect(() => {
    scroller();
  }, []);
  return (
    <div className="client-form-part part">
      {arr.map((elem, index: number) => (
        <InputComponent key={index} {...elem} />
      ))}
    </div>
  );
}

export default ClientFormPart;
