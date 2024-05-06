import React from "react";

function FilterComponent({
  value,
  onChangeHandler,
  btnClickHandler
}: {
  value: string;
  onChangeHandler: (e: any) => void;
  btnClickHandler: (e: any) => void;
}) {
  return (
    <form onSubmit={(e:any)=>{e.preventDefault()}} className="filter-form">
      <input
        value={value}
        onChange={onChangeHandler}
        title="search"
        name="search"
        type="text"
        placeholder="type project name"
      />
      <div className="sort-ctrl">
        <button onClick={btnClickHandler} name="ongoing" className="ongoing" type="button">
          ongoing
        </button>
        <button  onClick={btnClickHandler} name="completed" className="completed" type="button">
          completed
        </button>
      </div>
    </form>
  );
}

export default FilterComponent;
