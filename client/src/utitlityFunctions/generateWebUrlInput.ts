import { compoundUrlInputType } from "@/Types/types";
export default function generateWebUrlInput(index = 0, typeValue = "", linkValue = "") {
    const generatedWebUrlInput: compoundUrlInputType = {
        link: { value: linkValue, name: "link" },
        type: { value: typeValue, name: "type" },
        index,
    };
    return generatedWebUrlInput;
}

