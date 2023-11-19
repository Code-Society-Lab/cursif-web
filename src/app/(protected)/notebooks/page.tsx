"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider';
import Notify from '@config/notiflix-config';
import Fuse from 'fuse.js'
import SearchBar from '@/components/search-bar';
import Navigation from '@/components/navigation';
import { Loader } from '@/components/loader'
import Card from '@/components/notebooks/card';

const GET_NOTEBOOKS_QUERY = gql`
query GetNotebooks {
    notebooks {
      id
      title
      description
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
    return (<Loader/>)
  
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
                <button type="button" className="button bg-new font-medium rounded-lg text-sm px-10 py-2">New</button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 gap-2">
            {
              searchData?.map((notebook) => (
                <NotebookCard key={notebook.id} id={notebook.id} title={notebook.title} description={notebook.description} />
                ))
            }
            <a href="#/" className="rounded-notebook-card justify-center min-w-[120px] max-w-[380px] bg-component-faded">
              <h1 className="text-5xl text-center self-center text-faded" >+</h1>
            </a>          
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