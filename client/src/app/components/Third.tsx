"use client";
import { projectType, resultType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useState, useEffect } from "react";
import HelperThirdComponent from "./HelperThirdComponent";
import createRandomNumber from "@/utitlityFunctions/createRandomNumber";
function Third() {
  const defaultStateObj = {
    name: "",
    brief: {},
    designs: {},
    id: "",
  };
  const [state, setState] = useState(defaultStateObj);

  async function getRandomProjects() {
    const first = await fetch("/components");
    const second = await first.json();
    if (second.data.length) {
      const limit = second.data.length;
      let rand = createRandomNumber(limit);
      const {
        designs,
        name,
        brief,
        _id: id,
      } = second.data[rand] as projectType;
      // @ts-ignore
      setState({ designs, name, brief, id });
      setInterval(() => {
        const limit = second.data.length;
        let rand = createRandomNumber(limit);
        const {
          designs,
          name,
          brief,
          _id: id,
        } = second.data[rand] as projectType;
        // @ts-ignore
        setState({ designs, name, brief, id });
      }, 5000);
      return;
    }
  }
  useEffect(() => {
    getRandomProjects();
  }, []);
  return (
    <div className="third-component">
      {!state.name ? (
        <LoadingComponent />
      ) : (
        <>
          <h2>Previous Projects</h2>
          {state.id ? (
            <HelperThirdComponent
              name={state.name}
              // @ts-ignore
              brief={state.brief}
              id={state.id}
              // @ts-ignore
              designs={state.designs}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default Third;
