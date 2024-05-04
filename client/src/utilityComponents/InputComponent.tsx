"use client";

import { briefFormArrObjType } from "@/Types/types";


function InputComponent({
  label,
  value,
  action,
  name,
  inputHolderClass,
  placeholder,
  selectOptions,
  inputType = "text",
}: briefFormArrObjType) {
  return (
      <div className={inputHolderClass}>
          <label htmlFor={name}> {label} </label>
      {inputType === "select" ? (
        <select  id={name} onChange={action} name={name} title={label} value={value}>
          {selectOptions?.map((elem: string, index: number) => (
            <option key={index} value={elem}>
              {" "}
              {elem}{" "}
            </option>
          ))}
        </select>
      ) : inputType === "textarea"? <textarea id={name}
          placeholder={placeholder || `${label} ...`}
          onChange={action}
          name={name}
          value={value}
          title={label} /> : (
        <input id={name}
          placeholder={placeholder || `${label} ...`}
          onChange={action}
          name={name}
          value={value}
          type={inputType}
          title={label}
        />
      )}
    </div>
  );
}

export default InputComponent;
