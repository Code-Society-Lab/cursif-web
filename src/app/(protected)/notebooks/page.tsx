"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Notify } from '@config/notiflix-config';
import { Loader } from '@components/loader';

import Fuse from 'fuse.js'
import SearchBar from '@/components/search-bar';

import { UserNavigation } from '@/components/navigation';
import { Modal, openModal, closeModal } from '@/components/modal';

import { HiPlusCircle } from 'react-icons/hi'

import Card from '@/components/notebooks/card';
import NotebookForm from '@/components/notebooks/form';
import CommandPalette from '@/components/command-palette';

const GET_NOTEBOOKS_QUERY = gql`
  query GetNotebooks {
    notebooks {
      id
      title
      description
      updatedAt
      pages {
        id
        title
        parentId
        updatedAt
      }
    }
  }
`

const FUSE_OPTIONS = {
  keys: [
    "title",
    "description"
  ]
}

export default function Page() {
  const [notebooks, setNotebooks] = useState<Notebook[] | []>([]);
  const [searchData, setSearchData] = useState<Notebook[] | []>(notebooks)

  const { data, loading, error, refetch } = useQuery(GET_NOTEBOOKS_QUERY, {
    onCompleted: (data) => {
      setNotebooks(data.notebooks);
      setSearchData(data.notebooks);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    }
  });

  const doFilter = (query: string) => {
    setSearchData(searchFilter(notebooks, query));
  };

  const commands = {
      "actions": [
        {
          icon: <HiPlusCircle />,
          text: 'New Notebook',
          perform: () => openModal('new-notebook-modal'),
          closeOnComplete: true,
          keywords: ['new', 'create', 'add'],
        },
      ]
  };

  if (loading)
    return <Loader />;

  return (
    <>
      <CommandPalette commands={commands}/>

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
                searchData?.map((notebook, index) => {
                  return <Card key={notebook.id} notebook={notebook} />;
                })
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
          <NotebookForm onComplete={() => {
            refetch();
            closeModal('new-notebook-modal');
          }} />
        </Modal>
      </div>
    </>
  )
}

function searchFilter(notebooks: Notebook[], query: string): Notebook[] {
  if (!notebooks) return [];
  if (!query) return notebooks;

  const fuse = new Fuse(notebooks, FUSE_OPTIONS);
  const result = fuse.search(query);

  return result.map(r => r.item);
}
