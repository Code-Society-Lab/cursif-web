"use client";

import { Sidebar } from "@/components/notebooks/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, useMutation, gql } from "@apollo/client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { Spinner } from '@components/loader';
import { useEffect } from "react";
import Notify from '@config/notiflix-config';

const NOTEBOOK_QUERY = gql`
  query GetNotebook($id: ID!) {
    notebook(id: $id) {
      id
      title
      pages {
        id
        title
      }
    }
  }
`;

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

export default function Page({
  params,
}: {
  params: { notebook_id: string; page_id: string };
}) {
  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
  });

  const { data: pageData, loading: pageLoading, error: pageError } = useQuery(PAGE_QUERY, {
    variables: {
      id: params.page_id,
    },
  });

  const [updatePage, { data: pageUpdateData, loading: pageUpdateLoading, error: pageUpdateError }] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: params.page_id,
      title: pageData?.page.title,
    }
  });

  const [value, setValue] = useState(pageData?.page.content);
  const onChange = (value: string) => setValue(value);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updatePage({
      variables: {
        id: params.page_id,
        content: value,
      },
    });
    Notify.success('Note saved!');
  };

  if (loading)
    return <Loader />;

  if (pageLoading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <Sidebar
        notebook={data.notebook}
        currentPageId={params.page_id}
      />
      <div className="flex-[4]" >
        <form onSubmit={onSubmit}>

          <div className="relative">
            <SimpleMDE value={value} onChange={onChange} />
          </div>

          <button id="save-button" className="button !bg-accent float-right mt-6" type="submit">
            <span className="spinner"><Spinner /></span>
            <span className="label">Save</span>
          </button>

        </form>
      </div>

    </div>
  );
}
