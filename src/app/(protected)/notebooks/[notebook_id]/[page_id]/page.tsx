"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
import { useState, useEffect } from 'react';
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import { Bars3Icon } from '@heroicons/react/20/solid';

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
    }
  });

  // On mobile, hid the pages navigation menu by default
  useEffect(() => {
    const handleResize = () => {
      setIsNavVisible(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <div className="relative">
        <div
          className="p-1 mt-2 rounded cursor-pointer"
          onClick={() => setIsNavVisible(!isNavVisible)}
          title='Toggle pages navigation bar'
        >
          <Bars3Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex-4 max-w-screen-lg mx-auto overflow-hidden">
        <PageEditor page_id={params.page_id} />
      </div>
    </div>
  );
}
