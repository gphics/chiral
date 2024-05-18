import { mgtSliceAction } from "@/slices/mgtSlice";
import { imageType } from "@/Types/types";
import ImgComponent from "@/utilityComponents/ImgComponent";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function FormDesignComponent() {
  const router = useRouter();
  const [imgState, setImgState] = useState({
    files: [],
    file: { public_id: "", file: "" },
  });
  const dispatch = useDispatch();
  const { singleProject } = useSelector((state: any) => state.mgtSlice);
  const { updateSingleProject, updateIsLoading } = mgtSliceAction;
  const { designs, _id: id } = singleProject;
  function fileOnChangeHandler(e: any) {
    const { name, files } = e.target;

    if (name === "files") {
      setImgState((prev) => ({ ...prev, files }));
    } else {
      const file = files[0];
      setImgState((prev) => ({
        ...prev,
        file: { file, public_id: prev.file.public_id },
      }));
    }
  }
  function imgOnClick(public_id: string, e: any) {
    const imgs = document.querySelectorAll(".proj-img");
    // style update
    imgs.forEach((elem) => {
      // @ts-ignore
      elem.style.border = "none";
      if (elem === e.target && imgState.file.public_id !== public_id) {
        // @ts-ignore
        elem.style.border = "3px solid #FF00FF";
      }
    });
    // state update
    if (imgState.file.public_id === public_id) {
      setImgState((prev) => ({
        ...prev,
        file: { file: prev.file.file, public_id: "" },
      }));
    } else {
      setImgState((prev) => ({
        ...prev,
        file: { file: prev.file.file, public_id },
      }));
    }
  }
  async function imgDeleteHandler(public_id: string) {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/project/delete-design/${id}`;
    dispatch(updateIsLoading(true));
    const first = await fetch(`${baseUrl}?image_id=${public_id}`, {
      method: "DELETE",
    });
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    const { err } = second;
    if (err) {
      toast.error(err.message);
      return;
    }
    router.refresh();
  }
  async function formSubmitHandler(e: any) {
    e.preventDefault();
    const {
      file: { file },
      files,
    } = imgState;
    if (!file && !files.length) {
      toast.warn("file must be uploaded");
      return;
    }
    dispatch(updateIsLoading(true));
    const isUpdate = !!imgState.file.public_id;
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    let first;
    if (!isUpdate) {
      const formDataObj = new FormData();
      for (let index = 0; index < files.length; index++) {
        formDataObj.append("files", files[index]);
      }

      first = await fetch(`${baseUrl}/upload-designs/${id}`, {
        method: "POST",
        body: formDataObj,
      });
    } else {
      const formDataObj = new FormData();
      const { file, public_id } = imgState.file;
      formDataObj.append("file", file);
      first = await fetch(
        `${baseUrl}/update-design/${id}?image_id=${public_id}`,
        {
          method: "PUT",
          body: formDataObj,
        }
      );
    }
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    const { err } = second;
    if (err) {
      toast.error(err.message);
      return;
    }
    router.refresh();
  }
  return (
    <form onSubmit={formSubmitHandler} className="form-design-component">
      <div className="form-input">
        <label htmlFor="">Images</label>
        {imgState.file.public_id ? (
          <input
            onChange={fileOnChangeHandler}
            title="file"
            name="file"
            type="file"
          />
        ) : (
          <input
            title="files"
            multiple
            onChange={fileOnChangeHandler}
            name="files"
            type="file"
          />
        )}
      </div>
      <article>
        {!designs?.length ? (
          <h3>No Designs</h3>
        ) : (
          <>
            {designs.map((elem: imageType, index: number) => {
              return (
                <section key={index}>
                  <ImgComponent
                    onClick={(e: any) => {
                      imgOnClick(elem.public_id, e);
                    }}
                    url={elem.url}
                  />
                  <button
                    onClick={() => {
                      imgDeleteHandler(elem.public_id);
                    }}
                    className="btn"
                    type="button"
                  >
                    {""}
                    <MdDelete className="icon" />
                  </button>
                </section>
              );
            })}
          </>
        )}
      </article>
      <button onClick={formSubmitHandler} className="submit-btn" type="button">
        submit
      </button>
    </form>
  );
}

export default FormDesignComponent;
