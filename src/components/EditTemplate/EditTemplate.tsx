import React, { useState, ChangeEvent } from "react";

function EditTemplate() {
  const [value, setValue] = useState("Some text here");
  const [isInEditMode, setIsInEditMode] = useState(false);

  const changeEditMode = () => {
    console.log("should go to edit mode now");
    setIsInEditMode(true);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsInEditMode(false);
  };

  return (
    <div>
      {isInEditMode ? (
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          onBlur={handleBlur}
        />
      ) : (
        <div onDoubleClick={changeEditMode}>{value}</div>
      )}
    </div>
  );
}

export default EditTemplate;
