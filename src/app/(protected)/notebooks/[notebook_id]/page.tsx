"use client";

import { Sidebar } from "@/components/editor/sidebar";
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

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
  const notebook_id: string = params.notebook_id;
  const page_id: string = params.page_id;

  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: notebook_id,
    },
  });

  if (loading) return <Loader />;

  const notebook = data.notebook;

  const router = useRouter();
  function goToPage(page_id: String) {
    router.push(`/notebooks/${notebook_id}/${page_id}`);
  }

  return (
    <div className="h-screen flex h-screen items-stretch">
      <Sidebar
        notebook={notebook}
        selectedPage={page_id}
        if={goToPage}
      />
      <div className="editor" />
    </div>
  );
}
