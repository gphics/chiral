"use client";
import React, { useEffect } from "react";
import FilterComponent from "../../utilityComponents/FilterComponent";
import ProjectListComponent from "./components/ProjectListComponent";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { projectSliceActions } from "@/slices/projectSlice";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { projectType } from "@/Types/types";

function ProjectPage() {
  const { isLoading, search, duplicatedProjectList, projectList } = useSelector(
    (state: any) => state.projectSlice
  );
  const dispatch = useDispatch();
  const {
    updateAllProjects,
    updateIsLoading,
    updateProjectList,
    updateSearch,
  } = projectSliceActions;
  async function fetchProjects() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/components");
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    dispatch(updateAllProjects(second.data));
  }
  function btnClickHandler(e: any) {
    const { name } = e.target;
    const filtered = duplicatedProjectList.filter(
      (elem: projectType) => elem.status === name
    );
    dispatch(updateProjectList(filtered));
  }
  function onChangeHandler(e: any) {
    const {value} = e.target
    const filtered = duplicatedProjectList.filter((elem: projectType) =>
      elem.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(updateSearch(value.toLowerCase()))
    dispatch(updateProjectList(filtered));
  }
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <main className="project-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <FilterComponent
            onChangeHandler={onChangeHandler}
            btnClickHandler={btnClickHandler}
            value={search}
          />
          <ProjectListComponent arr={projectList} />
        </>
      )}
    </main>
  );
}

export default ProjectPage;
