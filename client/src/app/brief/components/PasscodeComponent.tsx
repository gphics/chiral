import { briefSliceActions } from "@/slices/briefSlice";
import LinkComponent from "@/utilityComponents/LinkComponent";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function PasscodeComponent() {
  const url = `${process.env.NEXT_PUBLIC_WHATSAPP_LINK}`;
  const { passcode, isLoading } = useSelector((state: any) => state.briefSlice);
  const dispatch = useDispatch();
  const {
    updatePasscodeKey,
    updatePasscode,
    updateAllow,
    updateIsLoading,
    updateBrief,
  } = briefSliceActions;
  async function submitHandler(e: any) {
    e.preventDefault();
    if (!passcode.key) {
      toast.warning("provide the passcode");
      return;
    }
    dispatch(updateIsLoading(true));
    const first = await fetch(`/brief/components?key=${passcode.key}`);
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    const { data, err } = second;
    if (err) {
      toast.error(err.message);
      return;
    }
    const { passcode: ps, brief } = data;
    if (ps.isLocked && ps.isUsed) {
      toast.error("passcode is locked, contact the admin to unlock it");
      return;
    } 
    {
      dispatch(updatePasscode(second.data.passcode));
      dispatch(updateAllow(true));
      if (brief) {
        dispatch(updateBrief(brief));
      }
    }
  }
  function inputOnChangeHandler(e: any) {
    dispatch(updatePasscodeKey(e.target.value));
  }
  return (
    <div className="generate-passcode-component">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <input
              title="passcode-input"
              placeholder="input passcode ..."
              type="text"
              name="passcode-input"
              onChange={inputOnChangeHandler}
              value={passcode.key}
              id="passcode-input"
            />
            <button onClick={submitHandler} type="button">
              submit
            </button>
          </form>
          <h3>
            No passcode ?
            <LinkComponent
              isTarget={true}
              url={url}
              title=" Generate Passcode"
            />
          </h3>
        </>
      )}
    </div>
  );
}

export default PasscodeComponent;
