"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import _ from 'lodash';

const NOTEBOOK_QUERY = gql`
  query GetNotebook($id: ID!) {
    notebook(id: $id) {
      id
      title
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
  const { data, loading, error } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    }
  });

  const mutableNotebook = _.cloneDeep(data?.notebook);

  if (loading)
    return <Loader />;

  return (
    <div className="flex h-screen items-stretch">
      <PagesNavigation
        notebook={mutableNotebook}
        currentPageId={params.page_id}
      />
      <div className="flex-[4]" />
    </div>
  );
}
