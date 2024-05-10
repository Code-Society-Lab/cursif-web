import './pages-navigation.css';

import Link from 'next/link'
import { Notify } from "@/config/notiflix-config";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { TrashIcon, PlusIcon, ArrowUturnLeftIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Modal, openModal, closeModal } from "@/components/modal";
import NotebookForm from "@/components/notebooks/form";
import DeletePageForm from '@/components/pages/delete';
import EditTitle from "@/components/pages/edit";
import DeleteNotebookForm from "@/components/notebooks/delete";
import DeleteForm from "@/components/delete";

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

const UPDATE_PAGE_MUTATION = gql`
   mutation UpdatePage($id: ID!, $content: String, $title: String) {
     updatePage(id: $id, content: $content, title: $title) {
       id
       title
       content
     }
   }
 `;

export function PagesNavigation({
  notebook,
  currentPageId,
  onUpdate,
}: {
  notebook: Notebook;
  currentPageId: string;
  onUpdate: () => void;
}) {
  const router = useRouter();
  const [createPage, { data, loading, error }] = useMutation(CREATE_PAGE_MUTATION, {
    variables: {
      title: "Untitled Page",
      parentId: notebook?.id,
      parentType: "notebook",
    },
    onCompleted: (data) => {
      onUpdate()
      router.push(`/notebooks/${notebook.id}/${data.createPage.id}`)
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: currentPageId,
    },
    onCompleted: () => {
      onUpdate()
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  if (error)
    return <div>Error loading page: {error.message}</div>;

  return (
    <nav className="pages-navigation">
      <div className="title" title={notebook.title}>
        <span className='flex items-center justify-center'>
          <b>{notebook.title}</b>
          <TrashIcon className="ml-2 h-4 w-4 cursor-pointer" onClick={() => openModal('delete-notebook-modal')} title="Delete Notebook" />
        </span>
      </div>

      <div className="tabs">
        <ul>
          {notebook?.pages?.map((page: Page) => (
            <li key={page.id} className={page.id == currentPageId ? 'selected' : ''}>
              <Link href={`/notebooks/${notebook.id}/${page.id}`} className="flex-1 truncate p-2" title={`${page.title} (Double-click to edit)`}>
                <EditTitle initialTitle={page.title} onUpdate={(title) => updatePage({ variables: { title } })} />
              </Link>
              
              <TrashIcon className="mx-2 h-5 w-5" onClick={() => openModal(`delete-page${page.id}-modal`)} title="Delete Page" />
              
              <Modal id={`delete-page${page.id}-modal`} title='Delete Page'>
                {/* <DeletePageForm page_id={page.id} onUpdate={onUpdate} onComplete={() => { closeModal(`delete-page${page.id}-modal`); }} /> */}
                <DeleteForm page_id={page.id} notebook_id='' onUpdate={onUpdate} onComplete={() => { 
                    router.push(`/notebooks/${notebook.id}`)
                }} />
              </Modal>
            </li>
          ))}
          <li className="p-2 text-gray-400" onClick={() => createPage()}>
            <PlusIcon className="w-5 h-5" /> New page
          </li>
        </ul>
      </div>

      <div className='update-action'>
        <span className='flex items-center cursor-pointer mb-2' onClick={() => openModal('update-notebook-modal')} title="Update Notebook">
          <Cog8ToothIcon className="ml-2 mr-2 h-4 w-4" /> Update Notebook
        </span>
      </div>

      <div className='back-action'>
        <span>
          <Link href={`/notebooks`} className="flex items-center">
            <ArrowUturnLeftIcon className="ml-2 mr-2 h-4 w-4" /> Back to Notebooks
          </Link>
        </span>
      </div>

      <Modal id='update-notebook-modal' title='Update Notebook'>
        <NotebookForm notebook={notebook} onComplete={() => { closeModal('update-notebook-modal'); }} />
      </Modal>

      <Modal id='delete-notebook-modal' title='Delete Notebook'>
        <DeleteForm page_id='' notebook_id={notebook?.id} onComplete={() => { closeModal('delete-notebook-modal'); }} onUpdate={() => router.push(`/notebooks`)} />
        {/* <DeleteNotebookForm notebook_id={notebook?.id} onComplete={() => { closeModal('delete-notebook-modal'); }} /> */}
      </Modal>
    </nav>
  );
}
