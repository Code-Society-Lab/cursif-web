"use client";

import { BasicEditor } from "@/components/notebooks/editor";
import { Sidebar } from "@/components/notebooks/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, useMutation, gql } from "@apollo/client";

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
  const { data: notebookData, loading: notebookLoading, error: notebookError } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
  });

  const { data: pageData, loading: pageLoading, error: pageError } = useQuery(PAGE_QUERY, {
    variables: {
      id: params.page_id,
    },
  });

  const [updatePage, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: params.page_id,
      title: pageData?.page.title,
      content: pageData?.page.content,
    }
  });

  if (pageLoading || notebookLoading) return <Loader />;

  if (notebookError || pageError) {
    return <div>Error: {notebookError?.message || pageError?.message}</div>;
  }

  return (
    <div className="flex min-h-screen min-w-[350px] items-stretch">
      <Sidebar
        notebook={notebookData.notebook}
        currentPageId={params.page_id}
      />
      <div className="flex-[4]" />
      <BasicEditor
        page={pageData?.page}
        updatePage={updatePage}
      />
    </div>
  );
}
