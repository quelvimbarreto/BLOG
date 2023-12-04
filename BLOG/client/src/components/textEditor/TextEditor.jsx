import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App() {
  const [content, setContent] = useState("");

  return (
    (
      <>
        <Editor
          apiKey="6dh6kpqwysfjsnqxlb0kemj5v781ykvkqzaaeuuetabubttl"
          onChange={(evt, editor) => setContent(editor.getContent())}
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </>
    ),
    content
  );
}
