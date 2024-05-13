import { mgtSliceAction } from "@/slices/mgtSlice";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function PasscodeUpdate({ showUpdateForm }: { showUpdateForm: () => void }) {
  const dispatch = useDispatch();
  const { singlePasscode, isLoading } = useSelector(
    (state: any) => state.mgtSlice
  );
  const { updateSinglePasscode, updateIsLoading } = mgtSliceAction;
  const arr = [
    { name: "isLocked", value: singlePasscode.isLocked },
    { name: "isUsed", value: singlePasscode.isUsed },
  ];
 
  function onSelectHandler(e: any) {
    let { value, name } = e.target;
    value = value === "true" ? true : false;
    dispatch(updateSinglePasscode({ name, value }));
  }
  async function formSubmitHandler() {
    dispatch(updateIsLoading(true));
    const api = `/mgt/passcode/components`;
    const first = await fetch(api, {
      method: "PUT",
      body: JSON.stringify(singlePasscode),
    });
      const second = await first.json();
      console.log(second)
    dispatch(updateIsLoading(!true));
    // @ts-ignore
    if (second.err) {
      // @ts-ignore
      toast.error(second?.err.message);
      return;
      }
      showUpdateForm()
  }
  return (
    <form
      onSubmit={formSubmitHandler}
      onClick={(e) => {
        const elem = document.querySelector(".passcode-update-form");
        if (elem === e.target) {
          showUpdateForm();
        }
      }}
      className="passcode-update-form"
    >
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section>
          {arr.map((elem, index: number) => {
            return (
              <div key={index}>
                <label htmlFor={elem.name}>isLocked</label>
                <select
                  onChange={onSelectHandler}
                  name={elem.name}
                  id={elem.name}
                  value={elem.value}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            );
          })}
          <button type="button" onClick={formSubmitHandler}>
            submit
          </button>
        </section>
      )}
    </form>
  );
}

export default PasscodeUpdate;
