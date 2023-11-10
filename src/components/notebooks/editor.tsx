import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css'
import { useState } from "react";
import EditorToolbar, { modules, formats } from "./editor-toolbar";

export function BasicEditor({
  page,
  updatePage
}: {
  page: any,
  updatePage: any
}) {
  const [value, setValue] = useState(page?.content);

  const handleContentChange = (content: string) => {
    setValue(content);
    updatePage({
      variables: {
        id: page.id,
        content: content,
      },
    });
  };

  return (
    <div className='mt-6 ml-5'>
      <div className="font-bold text-xl mb-4 ml-8 ">
        <p>{page?.title}</p>
      </div>
      <div className="relative">
      <EditorToolbar />
      <ReactQuill 
        modules={modules}
        formats={formats}
        theme="bubble"
        value={value}
        onChange={handleContentChange}
        placeholder={"Start typing..."}
      /></div>
    </div>
  );
}