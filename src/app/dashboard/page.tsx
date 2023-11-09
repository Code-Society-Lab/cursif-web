"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/loader'
import NotebookList from '@/components/notebookcards/notebooklist'
import Notify from '@config/notiflix-config';
import { NotebookData } from '../schemes/Notebook';
import Fuse from 'fuse.js'
import SearchBar from '@/components/searchbar';

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
    if (error) { nbList = <h1 className='self-center'>Error Loading Notebooks</h1> }
    else if (searchData) {
        nbList = <NotebookList notebooks={searchData} />
    } else {
        nbList = <Spinner className='self-center pt-8 w-[35px] h-[35px]' />
    }

    return (
        <div className="flex flex-col h-screen content-center">
            <div className="grid grid-cols-2 p-5">
                <div className="flex flex-row align-items-center">
                    <p className="text-5xl font-montez">Cursif</p>
                </div>
                <div className='text-right self-end text-xl pr-32'>Sign Out</div>
            </div>
            <div className='self-center flex flex-col w-10/12'>
                <div className='min-h-[20px]'></div>
                <div className="grid grid-cols-7 grid-rows-1 min-h-[300px] gap-4">
                    <span />

                    <div className="col-span-5 flex flex-col gap-10">
                        <div className='flex flex-col gap-12'>
                            <div>
                                <h1 className='pl-2 pb-2 font-bold'>Notebooks</h1>
                                <div className='flex flex-row grow'>
                                    <SearchBar onChange={(e) => searchFilter(e.currentTarget.value)} />
                                    <div className='flex flex-row grow justify-end'>
                                        <div className='pr-4'>
                                            <button type="button" className="text-white bg-[#309600] hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5">New</button>
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
        </div>
    )
}