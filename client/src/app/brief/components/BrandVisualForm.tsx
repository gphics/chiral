"use client";
import { toast } from "react-toastify";
import { briefSliceActions } from "@/slices/briefSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BrandVisualForm() {
  const [fileState, setFileState] = useState({
    files: [],
    single: { public_id: "", file: null },
  });
  const dispatch = useDispatch();
  const { brief } = useSelector((state: any) => state.briefSlice);
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
      if (!fileState.files.length || !fileState.single.public_id) {
        toast.warning("file must be uploaded");
        return;
      }
    }
    const api = `${process.env.NEXT_PUBLIC_API_URL}/brief/upload-visuals/${brief._id}`;
    
    const first = await fetch(api, {method:"POST", headers:{"Content-Type":"application/json"}})
  }
  return (
    <form onSubmit={brandVisualFormSubmit} className="brand-visuals-form">
      <label htmlFor="brandVisuals">Brand Visuals</label>
      {brief.brandVisuals.length ? (
        <input
          onChange={brandVisualOnChange}
          title="brand visuals"
          type="file"
          name="single"
          id="brandVisuals"
          accept="image/jpeg, image/jpg,image/png, image/svg,image/webp"
        />
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
      <button onClick={brandVisualFormSubmit} type="button">
        submit
      </button>
    </form>
  );
}

export default BrandVisualForm;
