"use client";

import { Sidebar } from "@/components/notebooks/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, useMutation, gql } from "@apollo/client";
import Notify from "@/config/notiflix-config";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const NOTEBOOK_QUERY = gql`
  query GetNotebook($id: ID!) {
    notebook(id: $id) {
      id
      title
      ownerId
      ownerType
      pages {
        id
        title
        parentId
      }
    }
  }
`;

const CREATE_PAGE_MUTATION = gql`
  mutation CreatePage($title: String!, $parentId: ID!, $parentType: String!) {
    createPage(title: $title,  parentId: $parentId, parentType: $parentType) {
        id
        title
        parentId
        parentType
    }
  }
`;

export default function Page({
  params,
}: {
  params: { notebook_id: Notebook["id"]; page_id: Page["id"] };
}) {
  const router = useRouter();
  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    }
  });

  const [createPage, { data: createPageData, loading: createPageLoading, error: createPageError }] = useMutation(CREATE_PAGE_MUTATION, {
    variables: {
      title: "Untitled Page",
      parentId: data?.notebook?.id,
      parentType: "notebook",
    },
    onCompleted: () => {
      Notify.success("Page created!");
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  useEffect(() => {
    if (createPageData && createPageData.createPage) {
      router.replace(`/notebooks/${params.notebook_id}/${createPageData.createPage.id}`);
    }
  }, [createPageData]);

  if (loading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <Sidebar
        notebook={data.notebook}
        currentPageId={params.page_id}
        createPage={createPage}
      />
      <div className="flex-[4]" />
    </div>
  );
}
