import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import Notify from '@config/notiflix-config';
import { Spinner } from '@/components/loader';

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
  const onChange = (value: string) => setValue(value);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updatePage({
      variables: {
        id: page_id,
        content: value,
      },
    });
    Notify.success('Note saved!');
  };

  return (
    <form onSubmit={onSubmit}>

      <div className="relative">
        <SimpleMDE 
            value={value} 
            onChange={onChange} 
          />
      </div>

      <button id="save-button" className="button !bg-accent float-right mt-6" type="submit">
        <span className="spinner"><Spinner /></span>
        <span className="label">Save</span>
      </button>

    </form>
  );
}