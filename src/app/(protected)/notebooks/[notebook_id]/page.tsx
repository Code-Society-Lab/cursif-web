"use client";

import { Sidebar } from "@/components/notebooks/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/navigation'

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
  const router = useRouter();
  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
  });

  if (loading)
    return <Loader />;

  if (!params.page_id) {
    const firstPageId = data.notebook.pages[0].id;
    if (firstPageId) {
      router.replace(`/notebooks/${params.notebook_id}/${firstPageId}`);
      return <Loader />;
    }
  }

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
