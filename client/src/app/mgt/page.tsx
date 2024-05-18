"use client";
import { mgtSliceAction } from "@/slices/mgtSlice";
import { projectType } from "@/Types/types";
import FilterComponent from "@/utilityComponents/FilterComponent";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallProjectList from "./components/SmallProjectList";

function DashboardPage() {
  const { search, isLoading, duplicatedProjectList, projectList } = useSelector(
    (state: any) => state.mgtSlice
  );
  const dispatch = useDispatch();
  const { updateIsLoading, fillAllProjects, fillProjectList, updateSearch } =
    mgtSliceAction;
  async function fetchProjects() {
    dispatch(updateIsLoading(true));
    const api = "/mgt/components";
    const first = await fetch(api);
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    dispatch(fillAllProjects(second.data));
  }
  function btnClickHandler(e: any) {
    const { name } = e.target;
    if (!duplicatedProjectList.length) {
      return;
    }
    const filtered = duplicatedProjectList.filter(
      (proj: projectType) => proj.status === name
    );
    dispatch(fillProjectList(filtered));
  }
  function onChangeHandler(e: any) {
    const { value } = e.target;
    if (!duplicatedProjectList.length) {
      return;
    }
    const filtered = duplicatedProjectList.filter((proj: projectType) =>
      proj.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(updateSearch(value));
    dispatch(fillProjectList(filtered));
  }
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <main className="full-page mgt-page">
      <FilterComponent
        onChangeHandler={onChangeHandler}
        btnClickHandler={btnClickHandler}
        value={search}
      />
      <section className="project-list">
        {isLoading && !search ? (
          <LoadingComponent />
        ) : projectList?.length ? (
          <>
            {" "}
            {projectList.map((elem: projectType, index: number) => {
              const {
                name,
                _id,
                status,
                brief: { _id: briefId },
              } = elem;

              return (
                <SmallProjectList
                  briefId={briefId}
                  status={status}
                  key={index}
                  name={name}
                  _id={_id}
                />
              );
            })}{" "}
          </>
        ) : (
          <h3 className="proj-nf">Project Not found</h3>
        )}
      </section>
    </main>
  );
}

export default DashboardPage;
