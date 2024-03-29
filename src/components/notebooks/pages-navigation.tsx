import './pages-navigation.css';

import Link from 'next/link'
import { Notify } from "@/config/notiflix-config";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { EllipsisVerticalIcon, PlusIcon, ArrowUturnLeftIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Modal, openModal, closeModal } from "@/components/modal";
import NotebookForm from "@/components/notebooks/form";

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

  if (error)
    return <div>Error loading notebook: {error.message}</div>;

  return (
    <nav className="pages-navigation">
      <div className="title" title={notebook.title}>
        <b>{notebook.title}</b>
      </div>

      <div className="tabs">
        <ul>
          {notebook?.pages?.map((page: Page) => (
            <li key={page.id} className={page.id == currentPageId ? 'selected' : ''}>
              <Link href={`/notebooks/${notebook.id}/${page.id}`} className="flex-1 p-2 text-ellipsis overflow-hidden" title={page.title}>
                {page.title}
              </Link>
              <a href="#"><EllipsisVerticalIcon className="h-5 w-5" /></a>
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
    </nav>
  );
}
