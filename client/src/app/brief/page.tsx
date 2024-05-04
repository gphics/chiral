"use client";

import { briefSliceType } from "@/Types/types";
import { useSelector } from "react-redux";
import MainBriefComponent from "./components/MainBriefComponent";
import PasscodeComponent from "./components/PasscodeComponent";

function BriefPage() {
  const { allow } = useSelector((state: any) => state.briefSlice);
  return <main>{allow ? <MainBriefComponent /> : <PasscodeComponent />}</main>;
}

export default BriefPage;
