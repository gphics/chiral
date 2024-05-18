import { mgtSliceAction } from "@/slices/mgtSlice";
import { compoundUrlInputType, urlType } from "@/Types/types";
import generateWebUrlInput from "@/utitlityFunctions/generateWebUrlInput";
import reParser from "@/utitlityFunctions/reParser";
import { useDispatch, useSelector } from "react-redux";
function WebUrlComponent() {
  const dispatch = useDispatch();
  const {
    singleProject: { webUrls, webUrlArr },
  } = useSelector((state: any) => state.mgtSlice);
  const { updateSingleProject } = mgtSliceAction;
  function addOne() {
    const arr1 = [...webUrlArr];
    const arr2 = [...webUrls];
    arr1.push(generateWebUrlInput(arr1.length));
    arr2.push({ link: "", type: "client" });
    dispatch(updateSingleProject({ name: "webUrls", value: arr2 }));
    dispatch(updateSingleProject({ name: "webUrlArr", value: arr1 }));
  }
  function removeOne() {
    const arr1 = [...reParser(webUrlArr)];
    const arr2 = [...reParser(webUrls)];
    if (arr1.length === 1) {
      return;
    }
    arr1.pop();
    arr2.pop();
    dispatch(updateSingleProject({ name: "webUrls", value: arr2 }));
    dispatch(updateSingleProject({ name: "webUrlArr", value: arr1 }));
  }
  function onChangeHandler(name: string, value: string, index: number) {
    const arr1 = [...reParser(webUrlArr)];
    const arr2 = [...reParser(webUrls)];
    arr1[index][name].value = value;
    arr2[index][name] = value;
    dispatch(updateSingleProject({ name: "webUrls", value: arr2 }));
    dispatch(updateSingleProject({ name: "webUrlArr", value: arr1 }));
  }
  return (
    <div className="web-url-component">
      <h4>Web Urls</h4>
      <section className="ctrls">
        <button onClick={addOne} type="button">
          +
        </button>
        <button onClick={removeOne} type="button">
          -
        </button>
      </section>
      <div className="holder">
        {webUrlArr?.map((elem: compoundUrlInputType, index: number) => {
          return (
            <div className="each-url-input" key={index}>
              <h6> {index + 1} </h6>
              <label htmlFor={elem.type.name}> {elem.type.name} </label>
              <select
                title={elem.type.name}
                name={elem.type.name}
                value={elem.type.value}
                onChange={(e: any) => {
                  const { name, value } = e.target;
                  onChangeHandler(name, value, index);
                }}
              >
                <option value="client">client</option>
                <option value="server">server</option>
              </select>
              <label htmlFor={elem.link.name}> {elem.link.name} </label>
              <input
                title={elem.link.name}
                name={elem.link.name}
                value={elem.link.value}
                onChange={(e: any) => {
                  const { name, value } = e.target;
                  onChangeHandler(name, value, index);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WebUrlComponent;
