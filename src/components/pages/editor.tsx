"use client"


import { useEffect, useState, useMemo, useCallback, useRef, forwardRef } from 'react';
import { useChannel } from '@/components/graphql/phoenix-socket';
import { Socket } from 'phoenix';

import dynamic from "next/dynamic";
import hljs from 'highlight.js';
import Config from '@/config';

import { Quill } from "react-quill";
import QuillMarkdown from 'quilljs-markdown';

import '@styles/editor.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// const QuillEditor = dynamic(
//   async () => {
//     const { Quill } = require("react-quill");
//     const { default: ReactQuill } = await import('react-quill');

//     Quill.register('modules/quillMarkdown', QuillMarkdown);

//     return ({ forwardedRef, ...props }: { forwardedRef: RefObject<ReactQuill> } & ReactQuillProps) => (
//       <ReactQuill ref={forwardedRef} {...props} />
//     );
//   }, {
//     ssr: false,
//   }
// )
const QuillEditor = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
    // const { Quill } = require("react-quill");
    // Quill.register('modules/quillMarkdown', QuillMarkdown);

    return ({ forwardedRef, ...props }: { forwardedRef: RefObject<ReactQuill> } & ReactQuillProps) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );
  }, { 
    ssr: false 
  }
);

export default function Editor({ pageId }) {
  const editorRef = useRef(null);
  const channel = useChannel(`page:${pageId}`);

  useEffect(() => {
    if (!channel) return;

    channel.on('updated', (payload) => {
      if (Config.development()) console.log("RCV", payload)

      editorRef.current.getEditor().updateContents(payload.changes, 'api')
    });

    channel.off("updated", channel);
  }, [editorRef, channel])

  const onChange = (value, delta, source, editor) => {
    if (!channel || source !== "user") return;
    if (Config.development()) console.log("SND", editor.getContents())

    channel.push("update", { changes: delta });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['code-block'],
      ['clean'],
    ],
    // syntax: { highlight: text => hljs.highlightAuto(text).value },
    // quillMarkdown: {},
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'code-block',
  ]

  return (
    <QuillEditor
      theme="snow"
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className="editor"
      forwardedRef={editorRef}
    />
  );
}