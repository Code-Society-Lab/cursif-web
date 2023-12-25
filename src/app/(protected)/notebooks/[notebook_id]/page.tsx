"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
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

export default function Page({
  params,
}: {
  params: { notebook_id: string; page_id: string };
}) {
  const router = useRouter();
  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    }
  });

  if (loading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <PagesNavigation
        notebook={data.notebook}
        currentPageId={params.page_id}
      />
      <div className="flex-[4]" />
    </div>
  );
}
