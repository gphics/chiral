"use client";
import { projectSliceActions } from "@/slices/projectSlice";
import { projectType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DesignProject from "./components/DesignProject";
import SoftwareProject from "./components/SoftwareProject";

function EachProjectPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    singleProject,
  }: { isLoading: boolean; singleProject: projectType } = useSelector(
    (state: any) => state.projectSlice
  );
  const { updateSingleProject, updateIsLoading } = projectSliceActions;
  async function fetchProject() {
    dispatch(updateIsLoading(true));
    const first = await fetch(`/project/components?id=${id}`);
    const second = await first.json();

    if (second.err) {
      dispatch(updateIsLoading(!true));
      toast.error(second.err.message);
      return;
    }
    dispatch(updateSingleProject(second.data));
    dispatch(updateIsLoading(!true));
  }
  useEffect(() => {
    fetchProject();
  }, [id]);
  return (
    <main className="each-project-page">
      {isLoading && !singleProject?._id ? <LoadingComponent/> : singleProject?.type === "design"? <DesignProject/> : <SoftwareProject/> }
    </main>
  );
}

export default EachProjectPage;
