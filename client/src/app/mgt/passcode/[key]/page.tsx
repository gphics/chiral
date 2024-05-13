"use client";
import { mgtSliceAction } from "@/slices/mgtSlice";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasscodeUpdate from "../components/PasscodeUpdate";
import Link from "next/link";

function EachPasscodePage() {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const { key } = useParams();
  const { updateIsLoading, fillSinglePasscode } = mgtSliceAction;
  const dispatch = useDispatch();
  const { singlePasscode, isLoading } = useSelector(
    (state: any) => state.mgtSlice
  );
  async function getSinglePasscode() {
    dispatch(updateIsLoading(!false));
    const first = await fetch(`/mgt/passcode/deps?key=${key}`);
    const second = await first.json();
    dispatch(updateIsLoading(false));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }

    dispatch(fillSinglePasscode(second.data?.passcode));
  }
  useEffect(() => {
    getSinglePasscode();
  }, [key]);
  function showUpdateForm() {
    setIsUpdate((prev) => !prev);
  }
  async function deletePasscode() {
    try {
      dispatch(updateIsLoading(true));
      const api = `/mgt/passcode/components?id=${singlePasscode._id}`;
      const first = await fetch(api, { method: "DELETE" });
      const second = await first.json();
      dispatch(updateIsLoading(!true));
      if (second.err) {
        toast.error(second.err.message);
        return;
      }
      router.push("/mgt/passcode");
    } catch (error:any) {
      toast.error(error.message)
    }
  }
  return (
    <main className="full-page single-passcode-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section>
          {isUpdate ? <PasscodeUpdate showUpdateForm={showUpdateForm} /> : ""}
          <article>
            <p>
              <span>key</span>
              {singlePasscode?.key}
            </p>
            <p>
              <span>isLocked</span>
              {singlePasscode?.isLocked.toString()}
            </p>
            <p>
              <span>isUsed</span>
              {singlePasscode?.isUsed.toString()}
            </p>
            {!singlePasscode?.projectId ? (
              ""
            ) : (
              <Link
                className="proj-goto"
                href={`/mgt/project/${singlePasscode?.projectId}`}
              >
                Go to Project
              </Link>
            )}
          </article>
          <aside>
            <button type="button" onClick={showUpdateForm}>
              update
            </button>
            <button onClick={deletePasscode} type="button">
              delete
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}

export default EachPasscodePage;
