"use client";

import '@styles/editor.css'

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import hljs from 'highlight.js';

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

export default function Page() {

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      status: false,
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
    } as SimpleMDE.Options;
  }, []);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="homepage-wave absolute inset-0 z-0"></div>

      <div className="mx-auto relative w-screen z-10">
        <div className="text-center">
          <p className="text-6xl font-bold">Welcome to Cursif</p>
          <p className="text-xl">Taking notes should be <b>quick</b> and <b>simple</b></p>
          <Link href="/login">
            <button className="button mt-16 text-xl">Get Started</button>
          </Link>
        </div>

        <p className="text-center font-extrabold mt-32 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-800">Try It Yourself!</p>
        <div className="mt-8 mx-auto relative border-2 border-gray-200 rounded shadow-lg h-96 w-[55%]">
          <SimpleMDE
            className='editor'
            placeholder='Write your thoughts...'
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
