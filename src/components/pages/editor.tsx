import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Loader } from "@/components/loader";

import SimpleMDE from "react-simplemde-editor";
import hljs from 'highlight.js';

import "easymde/dist/easymde.min.css";
import 'highlight.js/styles/github.css';

const PAGE_QUERY = gql`
   query GetPage($id: ID!) {
     page(id: $id) {
       id
       title
       content
     }
   }
 `;

const UPDATE_PAGE_MUTATION = gql`
   mutation UpdatePage($id: ID!, $content: String!, $title: String) {
     updatePage(id: $id, content: $content, title: $title) {
       id
       title
       content
     }
   }
 `;

export default function PageEditor({ page_id }: { page_id: String }): JSX.Element {
  const [value, setValue] = useState('');

  const { data, loading, error } = useQuery(PAGE_QUERY, {
    variables: {
      id: page_id,
    },
    onCompleted: (data) => {
      setValue(data.page.content);
    }
  });


  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: page_id,
      title: data?.page.title,
    }
  });

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  function save() {
    if (!value || value == data.page.content)
      return null;

    updatePage({
      variables: {
        id: page_id,
        content: value,
      },
    });

    console.log(`Content saved: ${value}`)
  }

  useEffect(() => {
    const interval = setInterval(save, 10000);
    return () => clearInterval(interval);
  });

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
      }
    } as SimpleMDE.Options;
  }, []);

  if (loading)
    return <Loader />;

  return (
    <SimpleMDE
      className='editor'
      value={value}
      onChange={onChange}
      placeholder='Write your thoughts...'
      options={options}
    />
  );
}