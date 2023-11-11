import EditorToolbar, { modules, formats } from "./editor-toolbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { PageTitle } from "./edit-title";
import { Loader } from "@components/loader";

export function BasicEditor({
  page,
  updatePage
}: {
  page: Page,
  updatePage: any
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  const handleContentChange = (content: string) => {
    setValue(content);
    updatePage({
      variables: {
        id: page.id,
        content: content,
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (page?.content) {
        setValue(page.content);
        setLoading(false);
      }
    }, 500);
  }, [page]);

  return (
    <div className='mt-6 ml-5'>
      <PageTitle
        page={page}
        updatePage={updatePage}
      />
      <div className="relative w-96">
        <EditorToolbar />
        {loading ? (
          <Loader />
        ) : (
          <ReactQuill
            modules={modules}
            formats={formats}
            theme="bubble"
            value={value}
            onChange={handleContentChange}
            placeholder={"Start typing..."}
          />
        )}
      </div>
    </div>
  );
}
