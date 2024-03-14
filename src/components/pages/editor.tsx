import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Notify from '@config/notiflix-config';

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
  const { data, loading, error } = useQuery(PAGE_QUERY, {
    variables: {
      id: page_id,
    },
  });

  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: page_id,
      title: data?.page.title,
    }
  });

  const [value, setValue] = useState(data?.page.content);
  const onChange = (newValue: string) => setValue(newValue);

  const onSubmit = () => {
    updatePage({
      variables: {
        id: page_id,
        content: value,
      },
    });
  };

  const save = () => {
    onSubmit();
  };

  useEffect(() => {
    const interval = setInterval(save, 10000);
    return () => clearInterval(interval);
  });

  // Custom toolbar button for save
  const saveButton = {
    name: "save",
    action: function (editor: any) {
      onSubmit();
      Notify.success('Saved!');
    },
    className: "fa fa-save",
    title: "Save",
  };

  return (
    <div className="relative">
      <SimpleMDE
        className='editor custom-simplemde'
        value={value}
        onChange={onChange}
        placeholder='Start typing your thought here...'
        options={{
          autofocus: true,
          spellChecker: true,
          toolbar: [
            saveButton,
            "bold", "italic", "heading", "|",
            "quote", "unordered-list", "ordered-list", "|",
            "link", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
          ],
          renderingConfig: {
            codeSyntaxHighlighting: true,
            hljs: hljs,
          }
        }}
      />
    </div>
  );
}