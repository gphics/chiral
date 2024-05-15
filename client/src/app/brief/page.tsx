"use client";
import { useSelector } from "react-redux";
import MainBriefComponent from "./components/MainBriefComponent";
import PasscodeComponent from "./components/PasscodeComponent";
import { useEffect } from "react";

function BriefPage() {
  
  const { allow } = useSelector((state: any) => state.briefSlice);
  return <main>{allow ? <MainBriefComponent /> : <PasscodeComponent />}</main>;
}

export default BriefPage;
