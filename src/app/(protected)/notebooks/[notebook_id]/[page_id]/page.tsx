"use client";

import { Loader } from "@/components/loader";
import { useQuery, useMutation ,gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { BasicEditor } from "@/components/notebooks/editor";
import React from "react";

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
  mutation UpdatePage($id: ID!, $content: String!) {
    updatePage(id: $id, content: $content) {
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
  const notebook_id: string = params.notebook_id;
  const page_id: string = params.page_id;


  const { data: pageData, loading: pageLoading, error: pageError } = useQuery(PAGE_QUERY, {
    variables: {
      id: page_id,
    },
  });

  const [updatePage, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: page_id,
      content: pageData?.page.content,
    },
  });

  if (pageLoading && updateLoading) return <Loader />;

  if (pageError || updateError) return <p>Error :(
    {pageError?.message}
    {updateError?.message})
  </p>;


  const router = useRouter();
  function goToPage(page_id: String) {
    router.push(`/notebooks/${notebook_id}/${page_id}`);
  }

  return (
    <div className="h-screen flex h-screen items-stretch">
      <BasicEditor page_id={page_id} initialContent={pageData?.page?.content} updatePage={updatePage} />
      <div className="editor" />
    </div>
  );
}