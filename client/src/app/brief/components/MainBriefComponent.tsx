"use client";
import { toast } from "react-toastify";
import { briefSliceActions } from "@/slices/briefSlice";
import { briefFormArrObjType } from "@/Types/types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandFormPart from "./BrandFormPart";
import ClientFormPart from "./ClientFormPart";
import BrandVisualForm from "./BrandVisualForm";
import LoadingComponent from "@/utilityComponents/LoadingComponent";

function MainBriefComponent() {
  const [partNum, setPartNum] = useState(0);
  const [isVisual, setIsVisual] = useState(false);

  const dispatch = useDispatch();
  const { brief, passcode, isLoading } = useSelector(
    (state: any) => state.briefSlice
  );
  const { updateIsLoading, updateBriefInput, resetBrief } = briefSliceActions;

  let clientArr: briefFormArrObjType[] = [
    { name: "clientName", value: brief.clientName, label: "Client Name" },
    {
      name: "clientEmail",
      value: brief.clientEmail,
      label: "Client Email",
      inputType: "email",
    },
    {
      name: "clientContact",
      value: brief.clientContact,
      label: "Client Contact",
      inputType: "tel",
    },
    {
      name: "clientLocation",
      value: brief.clientLocation,
      label: "Client Location",
    },
  ];
  clientArr = clientArr.map((elem) => {
    return {
      ...elem,
      inputHolderClass: "brief-form-input-holder",
      action: onChangeHandler,
    };
  });
  let brandArr: briefFormArrObjType[] = [
    {
      name: "brandName",
      value: brief.brandName,
      label: "Brand Name",
    },
    {
      name: "brandServices",
      value: brief.brandServices.join(","),
      label: "brandServices",
      placeholder: "comma separated values e.g (edu, tech) ",
    },
    {
      name: "jobType",
      value: brief.jobType,
      label: "Job Type",
      inputType: "select",
      selectOptions: ["design", "software"],
    },
    {
      name: "brandColors",
      value: brief.brandColors.join(","),
      label: "Brand Colors",
      placeholder: "comma separated values e.g (red, green) ",
    },
    {
      name: "brandValues",
      value: brief.brandValues.join(","),
      label: "Brand Values",
      placeholder: "comma separated values e.g (safe, fast) ",
    },
    {
      name: "brandContact",
      value: brief.brandContact,
      label: "Brand Contact",
      inputType: "number",
    },
    {
      name: "brandEmail",
      value: brief.brandEmail,
      label: "Brand Email",
      inputType: "email",
    },
    {
      name: "brandLocation",
      value: brief.brandLocation,
      label: "Brand Location",
    },
    {
      name: "brandDescription",
      value: brief.brandDescription,
      label: "Brand Description",
      inputType: "textarea",
    },
    {
      name: "jobDescription",
      value: brief.jobDescription,
      label: "Job Description",
      inputType: "textarea",
    },
    // { name: "", value: "", label: "", inputType: "" },

    // { name: "", value: "", label: "", inputType: "" },
  ];
  brandArr = brandArr.map((elem) => {
    return {
      ...elem,
      inputHolderClass: "brief-form-input-holder",
      action: onChangeHandler,
    };
  });
  function onChangeHandler(e: any) {
    const { name, value } = e.target;
    if (
      name === "brandServices" ||
      name === "brandValues" ||
      name === "brandColors"
    ) {
      const arr: string = value.split(",");
      dispatch(updateBriefInput({ name, value: arr }));
    } else {
      dispatch(updateBriefInput({ name, value }));
    }
  }

  async function InformationFormSubmitHandler(e: any) {
    e.preventDefault();

    // checking and verification

    {
      const arr = [...clientArr, ...brandArr];
      let fieldName = "";
      const check = arr.every((elem) => {
        if (!elem.value) {
          fieldName = elem.name;
          return false;
        } else {
          return true;
        }
      });

      if (!check) {
        toast.warning(`${fieldName} field is empty`);
        return;
      }
    }
    dispatch(updateIsLoading(true));
    // creating the data object
    const dataObj = { ...brief };
    const { key } = passcode;
    console.log(key)
    /*
    const obj = {
      key,
      brandName: "Ocean tide",
      brandLocation: "Nigeria",
      brandEmail: "nigerwar@gmail.com",
      brandServices: ["War statistics", "Rescue mission"],
      brandDescription:
        "we are an association that focuses on helping places where there is war. We dissolve and resolve the conflict morphologically and systematically thereby bringing peace to the people",
      brandContact: 90202092302,
      jobDescription:
        "In accordance to our services, we want you to develop an excellently fast and secure web application that can connect us and the war afflicted people together so that we can rescue them as soon as possible. We would also need our web application to be GPS sensitive. ",
      clientName: "Abdulbasit",
      clientContact: 9077585224,
      clientEmail: "abdul@gmail.com",
      clientLocation: "Nigeria",
      jobType: "software",
    };
    */
    let first;
    if (brief?._id) {
      first = await fetch("/brief/components", {
        method: "PUT",
        body: JSON.stringify({ ...dataObj }),
      });
    } else {
      first = await fetch("/brief/components", {
        method: "POST",
        body: JSON.stringify({ ...dataObj, key }),
      });
    }
    const second = await first.json();
    dispatch(updateIsLoading(!true));
    if (second.err) {
      toast.error(second.err.message);
      return;
    }
    toast.success("Operation completed. Do not refresh the page");
    toast.info("You can proceed to upload brand visuals");
    setIsVisual(true);
    dispatch(resetBrief(second.data._id));
  }

  return (
    <div className="main-brief-component">
      <section className="form-nav">
        <button
          onClick={() => {
            setIsVisual(false);
          }}
          type="button"
        >
          Informations
        </button>
        <button
          onClick={() => {
            setIsVisual(true);
          }}
          type="button"
        >
          Visuals
        </button>
      </section>
      {!isVisual ? (
        !isLoading ? (
          <form onSubmit={InformationFormSubmitHandler} className="brief-form">
            {partNum ? (
              <BrandFormPart arr={brandArr} />
            ) : (
              <ClientFormPart arr={clientArr} />
            )}
            <div className="btn-holder">
              {partNum ? (
                <>
                  {" "}
                  <button
                    onClick={() => {
                      setPartNum(0);
                    }}
                    type="button"
                  >
                    Previous
                  </button>{" "}
                  <button onClick={InformationFormSubmitHandler} type="button">
                    submit
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setPartNum(1);
                  }}
                  type="button"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        ) : (
          <LoadingComponent />
        )
      ) : (
        <BrandVisualForm />
      )}
    </div>
  );
}

export default MainBriefComponent;
