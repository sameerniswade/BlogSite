import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";

function GetImage({ control, setValue, setImageSource }) {
  const onDrop = useCallback((acceptedFiles) => {
    setImageSource(acceptedFiles);
    setValue("image", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="imageHandler p-5">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default GetImage;
