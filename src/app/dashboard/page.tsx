"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner'
import NotebookList from '@/components/notebookcards/notebooklist'
import Notify from '@config/notiflix-config';
import { NotebookData } from '../schemes/Notebook';
import Fuse from 'fuse.js'

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
    const [notebookData, setNBData] = useState<NotebookData[] | null>(null);
    const [searchData, setSearchData] = useState<NotebookData[] | null>(notebookData);

    let { loading: nbLoading, error: nbError, data: nbData } = useQuery(GET_NOTEBOOKS, {
        onCompleted: () => {
                setNBData(nbData.notebooks);
                console.log("Data Received");
        },
        onError: (error) => {
            Notify.failure(`${error.message}!`);
            setError(true);
        }
    });

    if (!searchData && notebookData) { setSearchData(notebookData); }

    const searchFilter = (query: string) => {
        console.log(`Query: ${query}`);
        if (!query || !notebookData) {
            setSearchData(notebookData);
            return;
        }
        const fuse = new Fuse(notebookData, fuseOptions);
        const finalResult: NotebookData[] = [];
        const result = fuse.search(query);
        result.forEach((r) => finalResult.push(r.item));
        setSearchData(finalResult);
    }

    let nbList = null
    if (error) {nbList = <h1 className='self-center'>Error Loading Notebooks</h1>}
    else if (searchData) {
            nbList = <NotebookList notebooks={searchData}/>
    } else {
            nbList = <Spinner className='self-center pt-8 w-[35px] h-[35px]'/>
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="grid grid-cols-2 p-5">
                <div className="flex flex-row align-items-center">
                    <p className="text-5xl font-montez">Cursif</p>
                </div>
                <div className='text-right self-end text-xl pr-32'>Sign Out</div>
            </div>
            <div className='min-h-[20px]'></div>
            <div className="grid grid-cols-7 grid-rows-1 min-h-[300px] gap-4">
                <span />

                <div className="col-span-5 flex flex-col gap-10">
                    <div className='flex flex-col gap-12'>
                        <div>
                            <h1 className='pl-2 pb-2 font-bold'>Notebooks</h1>
                            <div className='flex flex-row grow'>
                                <form className='grow'>
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input onChange={(e) => searchFilter(e.currentTarget.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                                    </div>
                                </form>

                                <div className='flex flex-row grow justify-end'>
                                    <div className='pr-4'>
                                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5">New</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {nbList}
                        
                    
                    </div>
                </div>


                <div className="col-start-5" />
            </div>
        </div>
    )
}