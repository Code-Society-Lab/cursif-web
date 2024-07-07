"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
import { useQuery, gql } from "@apollo/client";
import { Loader } from "@/components/loader";
import { useState } from "react";

import PageEditor from "@/components/pages/editor";

const NOTEBOOK_QUERY = gql`
  query GetNotebook($id: ID!) {
    notebook(id: $id) {
      id
      title
      description
      pages {
        id
        title
        parentId
      }
    }
  }
`;

export default function Page({
  params,
}: {
  params: { notebook_id: string; page_id: string };
}) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { data, loading, error, refetch } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
  });

  if (error)
    return <div>Error loading notebook: {error.message}</div>;

  if (loading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      {isNavVisible && (
        <PagesNavigation
          notebook={data?.notebook}
          currentPageId={params.page_id}
          onUpdate={() => refetch()}
        />
      )}
      <div
        className={`resizable-divider ${isNavVisible ? '' : 'closed'}`}
        onClick={() => setIsNavVisible(!isNavVisible)}
      />
      <div className="flex-[4]">
        <PageEditor page_id={params.page_id} />
      </div>
    </div>
  );
}
