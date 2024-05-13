import { mgtSliceAction } from "@/slices/mgtSlice";
import { resultType } from "@/Types/types";
import LoadingComponent from "@/utilityComponents/LoadingComponent";
import { useRouter } from "next/navigation";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function SmallProjectList({
  name,
  _id,
  status,
}: {
  name: string;
  _id: string | undefined;
  status: "completed" | "ongoing" | undefined;
}) {
  const { isLoading } = useSelector((state: any) => state.mgtSlice);
  const dispatch = useDispatch();
  const { updateIsLoading } = mgtSliceAction;
  const router = useRouter();
  async function delbtnClick(e: any) {
    dispatch(updateIsLoading(true));
    const api = `/mgt/components/?id=${_id}`;
    const first = await fetch(api, { method: "DELETE" });
    const second: resultType = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    // @ts-ignore
    toast.success(second.data);
    router.refresh();
  }
  function editbtnClick(e: any) {
    router.push(`/mgt/project/${_id}`);
  }
  return (
    <div className="small-project-list">
      {isLoading ? <LoadingComponent /> : ""}
      <h4> {name} </h4>
      <small> {status} </small>
      <MdOutlineEditNote onClick={editbtnClick} className="icon edit" />
      <MdDelete onClick={delbtnClick} className="icon del" />
    </div>
  );
}

export default SmallProjectList;
