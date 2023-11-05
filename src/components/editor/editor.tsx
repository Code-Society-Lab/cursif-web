import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
}

export function BasicEditor({
  page_id,
  initialContent,
  updatePage
}: {
  page_id: string,
  initialContent: string,
  updatePage: any
}) {
  const [value, setValue] = useState(initialContent);

  const handleContentChange = (content: string) => {
    setValue(content);
    updatePage({
      variables: {
        id: page_id,
        content,
      },
    });
  };

  return (
    <ReactQuill modules={modules} theme="snow" value={value} onChange={handleContentChange} placeholder={value} />
  );
}