import './pages-navigation.css';

import Link from 'next/link'
import Notify from "@/config/notiflix-config";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { EllipsisVerticalIcon, PlusIcon, ArrowUturnLeftIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

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
      Notify.success(`Page ${data.createPage.id} created!`)

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
        {/* Uncomment the following span and remove the current on once Create Notebook PR is merged. */}
        {/* <span className='flex items-center cursor-pointer' title="Update Notebook">
          <Cog8ToothIcon className="h-5 w-5" onClick={() => openModal('update-notebook-modal')} /> Update Notebook
        </span> */}
        <span className='flex items-center cursor-pointer' title="Update Notebook">
          <Cog8ToothIcon className="ml-2 mr-2 h-4 w-4 mb-2" /> Update Notebook
        </span>
      </div>
      <div className='back-action'>
        <span>
          <Link href={`/notebooks`} className="flex items-center">
            <ArrowUturnLeftIcon className="ml-2 mr-2 h-4 w-4" /> Back to Notebooks
          </Link>
        </span>
      </div>
    </nav>
  );
}
