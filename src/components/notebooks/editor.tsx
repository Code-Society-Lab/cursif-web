"use client";

import EditorToolbar, { modules, formats } from "./editor-toolbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useState, useEffect } from "react";
import { PageTitle } from "./edit-title";
import { Spinner } from '@components/loader';
import Notify from '@config/notiflix-config';

export function BasicEditor({
  page,
  updatePage
}: {
  page: Page,
  updatePage: any
}) {
  const [value, setValue] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updatePage({
      variables: {
        id: page.id,
        content: value,
      },
    });
    Notify.success('Note saved!');
  };

  const handleContentChange = (content: string) => {
    setValue(content);
  };

  useEffect(() => {
    if (page?.content) {
      setValue(page.content);
    }
  }, [page]);

  return (
    <div className='mt-6 ml-5'>
      <PageTitle
        page={page}
        updatePage={updatePage}
      />
      <form onSubmit={onSubmit}>
        <div className="relative">
          <EditorToolbar />
          <ReactQuill
            className="w-screen h-96"
            modules={modules}
            formats={formats}
            theme="bubble"
            value={value}
            onChange={handleContentChange}
            placeholder={"Start typing..."}
          />
        </div>
        <button id="save-button" className="button !bg-accent !text-white float-right mt-6" type="submit">
          <span className="spinner"><Spinner /></span>
          <span className="label">Save</span>
        </button>
      </form>
    </div>
  );
}
