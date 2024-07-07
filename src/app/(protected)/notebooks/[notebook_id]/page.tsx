"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
    onCompleted: (data) => {
      const firstPageId = data.notebook.pages[0].id;
      router.replace(`/notebooks/${params.notebook_id}/${firstPageId}`)
    }
  });

  if (error)
    return <div>Error loading notebook: {error.message}</div>;

  if (loading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <PagesNavigation
        notebook={data?.notebook}
        currentPageId={params.page_id}
        onUpdate={() => refetch() }
      />

      <div className="flex-[4]">

      </div>
    </div>
  );
}
