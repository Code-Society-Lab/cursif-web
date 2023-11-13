"use client";

import { Sidebar } from "@/components/notebooks/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";

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

  if (loading) 
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <Sidebar
        notebook={data.notebook}
        currentPageId={params.page_id}
      />
      <div className="flex-[4]" />
    </div>
  );
}
