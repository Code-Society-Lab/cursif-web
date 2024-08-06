import { useEffect, useState, useMemo, useCallback } from 'react';
import { Socket } from 'phoenix';

import dynamic from "next/dynamic";
import hljs from 'highlight.js';
import '@styles/editor.css';

import { useChannel } from '@/components/graphql/phoenix-socket';

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

export default function CollaborativeEditor({ pageId }) {
  const [content, setContent] = useState('');
  const channel = useChannel(`page:${pageId}`);

  useEffect(() => {
    if (!channel) return;

    channel.on('update', (payload) => {
      setContent(payload.content);
    });

    channel.off("update", channel);
  }, [channel])


  const handleChange = (value) => {
    if (!channel) return null;

    channel.push("update", { content: value });
    setContent(value);
  };

  // Simple MDE
  const options = useMemo(() => {
      return {
        autofocus: true,
        spellChecker: true,
        status: false,
        previewImagesInEditor: true,
        toolbar: [
          "bold", "italic", "heading", "|",
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|",
          "preview", "side-by-side", "fullscreen", "|",
          "guide"
        ],
        renderingConfig: {
          codeSyntaxHighlighting: true,
          hljs: hljs,
        },
      } as EasyMDE.Options;
    }, []);

  return (
    <SimpleMDE
      className='editor'
      value={content}
      onChange={handleChange}
      placeholder='Write your thoughts...'
      options={options}
    />
  );
}