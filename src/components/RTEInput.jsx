import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
function RTEInput({ lable, control, type, className, ...props }) {
  const editorRef = useRef(null);
  return (
    <Controller
      name="RTEInput"
      control={control}
      render={({ field: { onChange } }) => (
        <div className="m-2">
          {lable && <lable>{lable}</lable>}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={onChange}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      )}
    />
  );
}

export default RTEInput;
