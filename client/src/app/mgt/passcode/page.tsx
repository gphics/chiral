"use client";
import { mgtSliceAction } from "@/slices/mgtSlice";
import { passcodeType, resultType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function PasscodePage() {
  const { isLoading, duplicatedPasscodeList, passcodeList, search } =
    useSelector((state: any) => state.mgtSlice);
  const dispatch = useDispatch();
  const { fillAllPasscodes, updateIsLoading, updateSearch, fillPasscodeList } =
    mgtSliceAction;
  async function getPasscodes() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/passcode/components");
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    dispatch(fillAllPasscodes(second.data));
  }
  function onChangeHandler(e: any) {
    const { value } = e.target;
    dispatch(updateSearch(value));
    const filtered = duplicatedPasscodeList.filter((elem: passcodeType) =>
      elem.key.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(fillPasscodeList(filtered));
  }
  async function passcodeCreate() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/passcode/components", { method: "POST" });
    const second = await first.json();

    if (second.err) {
      dispatch(updateIsLoading(!true));
      toast.error(second.err.message);
      return;
    }
    const allPasscodes = [second.data, ...duplicatedPasscodeList];
    dispatch(fillAllPasscodes(allPasscodes));
    dispatch(updateIsLoading(!true));
  }
  useEffect(() => {
    getPasscodes();
  }, []);
  function sortBtnHandler(e: any) {
    const { name } = e.target;
    let filtered = duplicatedPasscodeList.filter(
      (elem: passcodeType) => elem.isUsed
    );
    // updating the passcode arr
    {
      if (name === "notUsed") {
        filtered = duplicatedPasscodeList.filter(
          (elem: passcodeType) => !elem.isUsed
        );
      }
      if (name === "reset") {
        filtered = duplicatedPasscodeList;
      }
      if (name === "isLocked") {
        filtered = duplicatedPasscodeList.filter(
          (elem: passcodeType) => elem.isLocked
        );
      }
      if (name === "notLocked") {
        filtered = duplicatedPasscodeList.filter(
          (elem: passcodeType) => !elem.isLocked
        );
      }
      dispatch(fillPasscodeList(filtered));
    }
    // updating the btn style
    const activeColor = "rgb(5, 224, 5)";
    const secondaryColor = "#FF00FF";
    const bgGradient =
      "linear-gradient(to top, #06061B , rgba(253,251, 251, 0.096) 100%,   #06061B , )";
    document.querySelectorAll(".ps-sort-btn").forEach((elem) => {
      if (elem === e.target) {
       
        // @ts-ignore
        elem.style.backgroundColor = activeColor
      } else {
        // @ts-ignore
        elem.style.backgroundColor = secondaryColor
      }
    });
  }
  return (
    <main className="full-page passcode-page">
      <form>
        <input
          placeholder="search ..."
          title="search"
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={onChangeHandler}
        />
        <div className="sort">
          <button
            className="ps-sort-btn"
            onClick={sortBtnHandler}
            name="reset"
            type="button"
          >
            reset
          </button>
          <button
            className="ps-sort-btn"
            onClick={sortBtnHandler}
            name="notUsed"
            type="button"
          >
            notUsed
          </button>
          <button
            className="ps-sort-btn"
            onClick={sortBtnHandler}
            name="isUsed"
            type="button"
          >
            isUsed
          </button>
          <button
            className="ps-sort-btn"
            onClick={sortBtnHandler}
            name="isLocked"
            type="button"
          >
            isLocked
          </button>
          <button
            className="ps-sort-btn"
            onClick={sortBtnHandler}
            name="notLocked"
            type="button"
          >
            notLocked
          </button>
        </div>
      </form>
      {/* passcode create */}
      <button onClick={passcodeCreate} className="create-btn" type="button">
        create
      </button>
      {isLoading && !search ? (
        <LoadingComponent />
      ) : !passcodeList.length ? (
        <h3 className="passcode-nf">No Passcode !</h3>
      ) : (
        passcodeList.map((elem: passcodeType, index: number) => {
          return (
            <Link
              className="pc-list"
              key={index}
              href={`/mgt/passcode/${elem.key}`}
            >
              {" "}
              <span> {index + 1}. </span>
              {elem.key}{" "}
            </Link>
          );
        })
      )}
    </main>
  );
}

export default PasscodePage;
