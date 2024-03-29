import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
// import { Controller } from "react-hook-form";

function RTE({ lable, control }) {
  const editorRef = useRef(null);

  return (
    <div>
      {lable && <label>{lable}</label>}
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Editor
            initialValue="<p>This is the initial content of the editor.</p>"
            onEditorChange={(e) => field.onChange(e)}
            init={{
              height: 300,
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
        )}
      />
    </div>
  );
}

export default RTE;
