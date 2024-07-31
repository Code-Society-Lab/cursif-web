"use client";

import { PagesNavigation } from "@/components/notebooks/pages-navigation";
import { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Loader } from "@/components/loader";
import { useQuery, gql } from "@apollo/client";
import { Bars3Icon } from '@heroicons/react/20/solid';
import { useRouter } from "next/navigation";
import { Notify } from "@/config/notiflix-config";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NOTEBOOK_QUERY = gql`
  query GetNotebook($id: ID!) {
    notebook(id: $id) {
      id
      title
      description
      owner {
        ... on PartialUser {
          id
          username
        }
      }
      pages {
        id
        title
        parentId
      }
      collaborators {
        id
        notebook_id
        user_id
        email
        username
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
  params: { notebook_id: string; page_id: string };
}) {
  const router = useRouter();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [createPage] = useMutation(CREATE_PAGE_MUTATION, {
    variables: {
      title: "Untitled Page",
      parentId: params?.notebook_id,
      parentType: "notebook",
    },
    onCompleted: (data) => {
      refetch();
      router.push(`/notebooks/${params?.notebook_id}/${data.createPage.id}`);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const { data, loading, error, refetch } = useQuery(NOTEBOOK_QUERY, {
    variables: {
      id: params.notebook_id,
    },
    onCompleted: (data) => {
      const firstPageId = data.notebook.pages[0]?.id;
      if (firstPageId) {
        router.replace(`/notebooks/${params.notebook_id}/${firstPageId}`);
      }
    }
  });

  // On mobile, hide the pages navigation menu by default
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

      {!isNavVisible && (
          <div className='absolute top-16 left-4 top-page-actions'>
            <Link href={`/notebooks`} className="flex items-center" title="Back to All Notebooks">
              <ChevronLeftIcon className="h-4 w-4 mr-1" />All Notebooks
            </Link>
          </div>
        )}
      <div className="flex-[4] flex items-center justify-center">
        <div className="text-center rounded text-sm">
          <p className="text-xl mb-4">No pages available</p>
          <button className='page-action' onClick={() => createPage()} title="New Page">
            Create Page
          </button>
        </div>
      </div>
    </div>
  );
}
