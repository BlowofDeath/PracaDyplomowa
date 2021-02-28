import React, { useRef } from "react";
import mergeRefs from "react-merge-refs";

export const FileUploadWrapper = ({
  onFileSelect,
  children,
  inputRef,
  name,
  accept,
}) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    onFileSelect && onFileSelect(e.target.files[0]);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileInput}
        ref={mergeRefs([fileInput, inputRef])}
        style={{ display: "none" }}
        name={name}
        accept={accept}
      />
      {React.cloneElement(children, {
        onClick: () => fileInput.current && fileInput.current.click(),
      })}
    </div>
  );
};

export default FileUploadWrapper;
