"use client"

import { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider';
import Notify from '@config/notiflix-config';
import Fuse from 'fuse.js'
import SearchBar from '@/components/search-bar';
import Navigation from '@/components/navigation';
import { Loader } from '@/components/loader'
import Card from '@/components/notebooks/card';
import CreateNotebookCard from '@/components/notebooks/create-notebook-card';

const GET_NOTEBOOKS_QUERY = gql`
query GetNotebooks {
    notebooks {
      id
      title
      description
      ownerId
      ownerType
    }
  }
`

const CREATE_NOTEBOOK_MUTATION = gql`
mutation CreateNotebook($title: String!, $description: String!, $ownerId: ID!, $ownerType: String!) {
  createNotebook(title: $title, description: $description, ownerId: $ownerId, ownerType: $ownerType) {
    description
    id
    title
  }
}
`

const fuseOptions = {
  keys: [
    "title",
    "description"
  ]
}

export default function Page() {
  const router = useRouter();
  const user = useAuth();
  const [notebookData, setNotebookData] = useState<Notebook[] | null>(null);
  const [searchData, setSearchData] = useState<Notebook[] | null>(notebookData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createNotebook, { data: createNotebookData, loading: createNotebookLoading, error: createNotebookError }] = useMutation(CREATE_NOTEBOOK_MUTATION, {
    variables: {
      title: title,
      description: description,
      ownerId: notebookData?.[0].ownerId,
      ownerType: notebookData?.[0].ownerType,
    },
    onCompleted: () => {
      Notify.success("Notebook created!");
    },
  });

  useEffect(() => {
    if (createNotebookData && createNotebookData.createNotebook) {
      router.push(`/notebooks/${createNotebookData.createNotebook.id}`);
    }
  }, [createNotebookData]
  );

  let { loading, error: notebookError, data: queryNotebookData } = useQuery(GET_NOTEBOOKS_QUERY, {
    onCompleted: () => {
      setNotebookData(queryNotebookData.notebooks);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    }
  });

  if (!searchData && notebookData) { setSearchData(notebookData); }

  const doFilter = (query: string) => {
    setSearchData(searchFilter(notebookData, query));
  }

  if (loading)
    return <Loader />

  return (
    <div className="flex flex-col h-screen content-center">
      <Navigation />
      <div className='self-center flex flex-col w-10/12 lg:w-6/12 h-screen'>
        <div className='min-h-[20px]'></div>
        <div className="flex flex-col gap-10 pb-8 md:pb-0">
          <div>
            <h1 className='text-2xl pl-2 pb-8 font-bold'>My Notebooks</h1>
            <div className='flex flex-row grow'>
              <SearchBar onChange={(e) => doFilter(e.currentTarget.value)} />
              <div className='flex flex-row grow justify-end'>
                <CreateNotebookCard
                  option="New"
                  setTitle={setTitle}
                  setDescription={setDescription}
                  onSubmit={() => createNotebook()}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 gap-2">
            {
              searchData?.map((notebook) => (
                <Card key={notebook.id} id={notebook.id} title={notebook.title} description={notebook.description} />
              ))
            }
            <span className="card justify-center min-w-[120px] max-w-[380px] bg-component-faded">
              <CreateNotebookCard
                  option="+"
                  setTitle={setTitle}
                  setDescription={setDescription}
                  onSubmit={() => createNotebook()}
                />
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

// Filter notebook data based on query
function searchFilter(notebookData: Notebook[] | null, query: string) {
  if (!notebookData) {
    return [];
  }
  if (!query) {
    return notebookData;
  }
  const fuse = new Fuse(notebookData, fuseOptions);
  const result = fuse.search(query);
  return result.map(r => r.item);
}