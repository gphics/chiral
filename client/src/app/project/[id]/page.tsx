"use client";
import { projectSliceActions } from "@/slices/projectSlice";
import { projectType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    dispatch(updateSingleProject(second.data));
  }
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <main className="each-project-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <article> {singleProject?.name} </article>
      )}
    </main>
  );
}

export default EachProjectPage;
