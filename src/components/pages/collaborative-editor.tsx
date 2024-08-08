"use client"


import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useChannel } from '@/components/graphql/phoenix-socket';
import { Socket } from 'phoenix';

import dynamic from "next/dynamic";
import hljs from 'highlight.js';
import Config from '@/config';

import QuillEditor, { Quill } from 'react-quill';
import QuillMarkdown from 'quilljs-markdown';
import Emoji from 'quill-emoji';

import '@styles/editor.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

Quill.register('modules/quillMarkdown', QuillMarkdown);

export default function CollaborativeEditor({ pageId }) {
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
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
    quillMarkdown: {},
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
    'align',
    'color',
    'code-block',
  ]

  return (
    <QuillEditor
      // theme="bubble"
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-full"
      ref={editorRef}
    />
  );
}