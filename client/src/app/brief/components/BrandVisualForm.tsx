"use client";
import { toast } from "react-toastify";
import { briefSliceActions } from "@/slices/briefSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageType } from "@/Types/types";
import { IoTrashBinSharp } from "react-icons/io5";
import Image from "next/image";
import LoadingComponent from "@/utilityComponents/LoadingComponent";

function BrandVisualForm() {
  const [fileState, setFileState] = useState({
    files: [],
    single: { public_id: "", file: "" },
  });
  const dispatch = useDispatch();
  const { brief, isLoading } = useSelector((state: any) => state.briefSlice);
  const { updateIsLoading, updateBrief } = briefSliceActions;
  function brandVisualOnChange(e: any) {
    e.preventDefault();
    const { files, name } = e.target;
    if (name === "single") {
      setFileState((prev) => ({
        ...prev,
        single: { public_id: prev.single.public_id, file: files[0] },
      }));
      return;
    }
    setFileState((prev) => ({ ...prev, files }));
  }
  async function brandVisualFormSubmit(e: any) {
    e.preventDefault();
    {
      if (!fileState.files.length && !fileState.single.public_id) {
        toast.warning("file must be uploaded");
        return;
      }
    }
    dispatch(updateIsLoading(true));
    const api = process.env.NEXT_PUBLIC_API_URL;
    let url = "";
    const formDataObj = new FormData();
    const isUpdate = !!fileState.single.public_id;
    if (isUpdate) {
      formDataObj.append("file", fileState.single.file);
      url = `${api}/brief/update-visual/${brief._id}?image_id=${fileState.single.public_id}`;
    } else {
      for (let index = 0; index < fileState.files.length; index++) {
        formDataObj.append("files", fileState.files[index]);
      }
      url = `${api}/brief/upload-visuals/${brief._id}`;
    }

    const first = await fetch(url, {
      method: isUpdate ? "PUT" : "POST",
      body: formDataObj,
    });
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    toast.success("Operation complete");
    dispatch(updateBrief(second.data));
  }

  function imgOnClick(target: any, index: number, pub: string) {
    const {
      single: { file, public_id },
      files,
    } = fileState;
    const finalPublicId = public_id === pub ? "" : pub;
    setFileState((prev) => ({
      files,
      single: { file, public_id: finalPublicId },
    }));
    const imgs = document.querySelectorAll(".brand-visual-img");
    imgs.forEach((elem) => {
      elem.classList.remove("active");
      if (elem === target && finalPublicId) {
        elem.classList.add("active");
      }
    });
    document.querySelectorAll(`.del-btns`).forEach((elem) => {
      // @ts-ignore
      elem.style.display = "none";
      if (elem.classList.contains(`num-${index}`) && finalPublicId) {
        // @ts-ignore
        elem.style.display = "block";
      }
    });
  }
  async function deleteImage() {
    if (!brief._id || !fileState.single.public_id) {
      toast.warning("something went wrog !");
      return;
    }
    dispatch(updateIsLoading(true));
    const api = process.env.NEXT_PUBLIC_API_URL;
    const url = `${api}/brief/delete-visual/${brief._id}?image_id=${fileState.single.public_id}`;
    const first = await fetch(url, { method: "DELETE" });
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    toast.success("Operation complete");
    dispatch(updateBrief(second.data));
  }
  return (
    <form onSubmit={brandVisualFormSubmit} className="brand-visuals-form">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <label htmlFor="brandVisuals">Brand Visuals</label>
          {fileState.single.public_id ? (
            <>
              <input
                onChange={brandVisualOnChange}
                title="brand visuals"
                type="file"
                name="single"
                id="brandVisuals"
                accept="image/jpeg, image/jpg,image/png, image/svg,image/webp"
              />
            </>
          ) : (
            <input
              onChange={brandVisualOnChange}
              title="brand visuals"
              multiple
              type="file"
              name="brandVisuals"
              id="brandVisuals"
              accept="image/jpeg, image/jpg,image/png, image/svg,image/webp"
            />
          )}
          <article className="img-list">
            {brief.brandVisuals.map((elem: imageType, i: number) => {
              return (
                <div className="img-holder" key={i}>
                  <Image
                    alt="brand visuals"
                    className="brand-visual-img"
                    onClick={(e) => {
                      imgOnClick(e.target, i, elem.public_id);
                    }}
                    width={100}
                    height={100}
                    src={elem.url}
                  />
                  <button
                    onClick={() => {
                      deleteImage();
                    }}
                    className={`del-btns num-${i}`}
                    type="button"
                  >
                    {""}
                    <IoTrashBinSharp className="icon" />
                  </button>
                </div>
              );
            })}
          </article>
          <button onClick={brandVisualFormSubmit} type="button">
            submit
          </button>
        </>
      )}
    </form>
  );
}

export default BrandVisualForm;
