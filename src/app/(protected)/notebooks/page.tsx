"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Notify } from '@config/notiflix-config';
import { Loader } from '@components/loader';

import { UserNavigation } from '@/components/navigation';
import { Modal, openModal, closeModal } from '@/components/modal';

import Fuse from 'fuse.js'
import SearchBar from '@/components/search-bar';

import Card from '@/components/notebooks/card';
import NotebookForm from '@/components/notebooks/form';


const GET_NOTEBOOKS_QUERY = gql`
query GetNotebooks {
    notebooks {
      id
      title
      description
      updated_at
      pages {
        id
        title
        parentId
        updated_at
      }
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
  const [notebooks, setNotebooks] = useState<Notebook[] | null>(null);
  const [searchData, setSearchData] = useState<Notebook[] | null>(notebooks)

  const { data, loading, error, refetch } = useQuery(GET_NOTEBOOKS_QUERY, {
    onCompleted: () => {
      setNotebooks(data.notebooks);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    }
  });

  if (!searchData && notebooks)
    setSearchData(notebooks);

  const doFilter = (query: string) => {
    setSearchData(searchFilter(notebooks??[], query));
  };

  if (loading)
    return <Loader />;

  return (
    <div className="flex flex-col content-center">
      <UserNavigation />

      <div className='w-full max-w-[920px] px-5 mx-auto'>
        <div className="flex flex-col gap-10">
          <div>
            <h1 className='text-2xl pl-2 pb-8 font-bold'>My Notebooks</h1>
            <div className='flex flex-row grow'>
              <SearchBar onChange={(e) => doFilter(e.currentTarget.value)} />
              <div className='flex flex-row grow justify-end'>
                <button className="button bg-new font-medium text-sm" onClick={() => openModal('new-notebook-modal')}>
                  New
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {
              searchData?.map((notebook, index) => (
                <Card key={notebook.id} notebook={notebook} />
              ))
            }

            <span className="card-faded cursor-pointer justify-center min-w-[250px] min-h-[135px]" onClick={() => openModal('new-notebook-modal')}>
              <div className="flex justify-center">
                <span className="text-5xl text-center text-faded">+</span>
              </div>
            </span>
          </div>

        </div>
      </div>

      <Modal id='new-notebook-modal' title='New notebook'>
        <NotebookForm onComplete={() => { refetch(); closeModal('new-notebook-modal'); }} />
      </Modal>
    </div>
  )
}

function searchFilter(notebooks: Notebook[], query: string): Notebook[] {
  if (!notebooks) return [];
  if (!query) return notebooks;

  const fuse = new Fuse(notebooks, fuseOptions);
  const result = fuse.search(query);

  return result.map(r => r.item);
}
