import Link from 'next/link'
import Notify from "@/config/notiflix-config";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";

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
    <nav className="w-[300px] p-2">
      <div className="p-8 text-center text-ellipsis overflow-hidden" title={notebook.title}>
        <b>{notebook.title}</b>
      </div>

      <ul>
        {notebook.pages.map((page: Page) => (
          <li key={page.id} className={`flex items-center my-2 cursor-pointer rounded-md ${page.id == currentPageId && "selected"}`}>
            <Link href={`/notebooks/${notebook.id}/${page.id}`} className="flex-1 p-2 text-ellipsis overflow-hidden" title={page.title}>
              {page.title}
            </Link>
            <a href="#"><EllipsisVerticalIcon className="h-5 w-5" /></a>
          </li>
        ))}
        <li className="flex justify-center items-center p-2 cursor-pointer rounded-md text-gray-400" onClick={() => createPage()}>
          <PlusIcon className="w-5 h-5"/> New page
        </li>
      </ul>
    </nav>
  );
}
