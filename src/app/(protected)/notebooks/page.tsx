"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import Notify from '@config/notiflix-config';
import Fuse from 'fuse.js'
import SearchBar from '@/components/search-bar';
import Navigation from '@/components/navigation';
import { Spinner } from '@/components/loader'
import NotebookList from '@/components/notebooks/cards/notebook-list'
import { useAuth } from '@/components/auth-provider';

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
  const [error, setError] = useState<boolean>(false);
  const [notebookData, setNotebookData] = useState<Notebook[] | null>(null);
  const [searchData, setSearchData] = useState<Notebook[] | null>(notebookData);

  let { loading: notebookLoading, error: notebookError, data: queryNotebookData } = useQuery(GET_NOTEBOOKS_QUERY, {
    onCompleted: () => {
      setNotebookData(queryNotebookData.notebooks);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
      setError(true);
    }
  });

  if (!searchData && notebookData) { setSearchData(notebookData); }

  const doFilter = (query: string) => {
    setSearchData(searchFilter(notebookData, query));
  }

  let notebookList = <Spinner className='self-center pt-8 w-[35px] h-[35px]' />;
  if (error) {
    notebookList = <h1 className='self-center'>Error Loading Notebooks</h1>
  }
  else if (searchData) {
    notebookList = <NotebookList notebooks={searchData} />
  }

  const searchBar = <SearchBar onChange={(e) => doFilter(e.currentTarget.value)} />

  return (
    <div className="flex flex-col h-screen content-center">
      <Navigation />
      <div className='self-center flex flex-col w-10/12 lg:w-6/12 h-screen'>
        <div className='min-h-[20px]'></div>
        <div className="flex flex-col gap-10">

          <div>
            <h1 className='text-2xl pl-2 pb-8 font-bold'>My Notebooks</h1>
            <div className='flex flex-row grow'>
              {searchBar}
              <div className='flex flex-row grow justify-end'>
                <button type="button" className="green-button font-medium rounded-lg text-sm px-10 py-2">New</button>
              </div>
            </div>
          </div>

          {notebookList}
          <div className='pb-16' /> {/* for mobile we need some extra space on the bottom to show all cards*/}
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