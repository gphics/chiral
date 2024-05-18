"use client";

import { mgtSliceAction } from "@/slices/mgtSlice";
import { weakBriefType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BriefDetails from "../components/BriefDetails";

function BriefPreviewPage() {
  const { isLoading, brief} = useSelector((state: any) => state.mgtSlice);
  const briefDetails = brief as weakBriefType;
  const dispatch = useDispatch();
  const { updateIsLoading, fillBrief} = mgtSliceAction;
  const { id } = useParams();
  async function getBrief() {
    dispatch(updateIsLoading(true));
    const first = await fetch(`/mgt/brief/components?id=${id}`);
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    const brief = second.data;
    dispatch(fillBrief(brief));
  }

  useEffect(() => {
    getBrief();
  }, [id]);
  return (
    <main className="full-page brief-preview-page">
      {isLoading ? (
        <LoadingComponent />
      ) : briefDetails?._id ? (
        <BriefDetails obj={briefDetails} />
      ) : (
        <h3 className="brief-nf">Brief Not Found</h3>
      )}
    </main>
  );
}

export default BriefPreviewPage;
