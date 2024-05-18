"use client";
import { mgtSliceAction } from "@/slices/mgtSlice";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormDetailsComponent from "../components/FormDetailsComponent";
import FormDesignComponent from "../components/FormDesignComponent";
import generateWebUrlInput from "@/utitlityFunctions/generateWebUrlInput";
import { urlType } from "@/Types/types";

function SingleProjectPage() {
  const dispatch = useDispatch();
  const [formNumber, setForNumber] = useState(1);
  const {
    isLoading,
    singleProject: { type },
  } = useSelector((state: any) => state.mgtSlice);
  const { id } = useParams();
  const { fillSingleProject, updateIsLoading } = mgtSliceAction;
  async function getProject() {
    dispatch(updateIsLoading(true));
    const api = `/mgt/project/components?id=${id}`;
    const first = await fetch(api);
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    const { webUrls, type } = second.data;
    let payload = second.data;
    if (type === "software") {
      let arr = [generateWebUrlInput()];
      if (webUrls?.length) {
        arr = webUrls.map((elem: urlType, index: number) => {
          return generateWebUrlInput(index, elem.type, elem.link);
        });
      } else {
        const newWebUrl = { link: "", type: "client" };
        payload.webUrls = [newWebUrl];
      }
      payload.webUrlArr = arr;
    }
    dispatch(fillSingleProject(payload));
  }

  useEffect(() => {
    getProject();
  }, [id]);
  return (
    <main className="full-page single-project-page">
      {isLoading ? (
        <LoadingComponent isAbsolute={true} />
      ) : (
        <>
          {type !== "design" ? (
            ""
          ) : (
            <div className="btn-holder">
              <button
                onClick={() => {
                  setForNumber(0);
                }}
                type="button"
                className="form-num-btn"
              >
                Details
              </button>
              <button
                onClick={() => {
                  setForNumber(1);
                }}
                type="button"
                className="form-num-btn"
              >
                Designs
              </button>
            </div>
          )}
          {!formNumber ? (
            <FormDetailsComponent />
          ) : type === "design" ? (
            <FormDesignComponent />
          ) : (
            ""
          )}
        </>
      )}
    </main>
  );
}

export default SingleProjectPage;
