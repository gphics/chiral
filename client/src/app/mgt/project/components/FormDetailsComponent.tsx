"use client";
import { mgtSliceAction } from "@/slices/mgtSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import WebUrlComponent from "./WebUrlComponent";


function FormDetailsComponent() {
  const dispatch = useDispatch();
  const { singleProject } = useSelector((state: any) => state.mgtSlice);
  const { updateSingleProject, updateIsLoading} =
    mgtSliceAction;
  const { name, techStacks, deploymentPlatforms, cost, status, type } =
    singleProject;

  ////////////////
  ////////////////
  ////////////////
  type inpType = { name: string; value: string; type?: string };
  const arr: inpType[] = [
    { name: "name", value: name },
    { name: "cost", value: cost, type: "number" },
    { name: "techStacks", value: techStacks?.join(", ") },
    { name: "deploymentPlatforms", value: deploymentPlatforms?.join(", ") },
  ];
  interface selectType extends inpType {
    options?: string[];
  }
  const selectArr: selectType[] = [
    { name: "status", options: ["completed", "ongoing"], value: status },
    { name: "type", options: ["design", "software"], value: type },
  ];
  ////////////////
  ////////////////
  ////////////////
  async function formSubmitHandler(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const api = "/mgt/project/components";
    const first = await fetch(api, {
      method: "PUT",
      body: JSON.stringify(singleProject),
    });
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    const { err } = second;
    if (err) {
      toast.error(err.message);
      return;
    }

  }
  function onChangeHandler(e: any) {
    let { name, value } = e.target;
    if (name === "techStacks" || name === "deploymentPlatforms") {
      value = value.split();
    }
    dispatch(updateSingleProject({ name, value }));
  }
  return (
    <form onSubmit={formSubmitHandler} className="form-details-component">
      {arr.map((elem, index: number) => {
        // type checking
        if (elem.name === "deploymentPlatforms" || elem.name === "techStacks") {
          if (type === "design") {
            return;
          }
        }
        return (
          <div className="simple" key={index}>
            <label htmlFor={elem.name}> {elem.name} </label>
            <input
              onChange={onChangeHandler}
              title={elem.name}
              name={elem.name}
              type={elem.type || "text"}
              value={elem.value}
            />
          </div>
        );
      })}
      {/* select inputs */}
      {selectArr.map((elem, index: number) => (
        <div className="simple" key={index}>
          <label htmlFor={elem.name}> {elem.name} </label>
          <select
            onChange={onChangeHandler}
            value={elem.value}
            name={elem.name}
            title={elem.name}
          >
            {elem.options?.map((item, i: number) => (
              <option value={item} key={i}>
                {" "}
                {item}{" "}
              </option>
            ))}
          </select>
        </div>
      ))}
      {type && type === "software" ? <WebUrlComponent /> : ""}
      <button className="submit-btn" onClick={formSubmitHandler} type="button">
        submit
      </button>
    </form>
  );
}
export default FormDetailsComponent;
