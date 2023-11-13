"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/loader'
import NotebookList from '@/components/notebooks/cards/notebooklist'
import Notify from '@config/notiflix-config';
import Fuse from 'fuse.js'
import SearchBar from '@/components/searchbar';
import Navigation from '@/components/navigation';
const GET_NOTEBOOKS = gql`
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
    const [error, setError] = useState<boolean>(false);
    const [notebookData, setNBData] = useState<Notebook[] | null>(null);
    const [searchData, setSearchData] = useState<Notebook[] | null>(notebookData);

    let { loading: nbLoading, error: nbError, data: nbData } = useQuery(GET_NOTEBOOKS, {
        onCompleted: () => {
            setNBData(nbData.notebooks);
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

    let nbList = <Spinner className='self-center pt-8 w-[35px] h-[35px]' />;
    if (error) {
        nbList = <h1 className='self-center'>Error Loading Notebooks</h1>
    }
    else if (searchData) {
        nbList = <NotebookList notebooks={searchData} />
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

                    {nbList}
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
    const finalResult: Notebook[] = [];
    const result = fuse.search(query);
    result.forEach((r) => finalResult.push(r.item));
    return finalResult;
}