"use client";

import { Sidebar } from "@/components/notebooks/sidebar";
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
  params: { notebook_id: Notebook["id"]; page_id: Page["id"] };
}) {
  const notebook_id: Notebook["id"] = params.notebook_id;
  const page_id: Page["id"] = params.page_id;

  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: notebook_id,
    },
  });

  if (loading) return <Loader />;

  const notebook = data.notebook;

  const router = useRouter();
  function goToPage(page_id: Page["id"]) {
    router.push(`/notebooks/${notebook_id}/${page_id}`);
  }

  return (
    <div className="h-screen flex h-screen items-stretch">
      <Sidebar
        notebook={notebook}
        selectedPage={page_id}
        setSelectedPage={goToPage}
      />
      <div className="flex-[4]" />
    </div>
  );
}
