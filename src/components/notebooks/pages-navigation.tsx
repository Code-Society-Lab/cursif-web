import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import Notify from "@/config/notiflix-config";
import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

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
}: {
  notebook: Notebook;
  currentPageId: string;
}) {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>(notebook?.pages || []);

  const [createPage, { data: createPageData, loading: createPageLoading, error: createPageError }] = useMutation(CREATE_PAGE_MUTATION, {
    variables: {
      title: "Untitled Page",
      parentId: notebook?.id,
      parentType: "notebook",
    },
    onCompleted: () => {
      Notify.success("Page created!");
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  useEffect(() => {
    if (createPageData && createPageData.createPage) {
      setPages([...pages, createPageData.createPage]);
      // router.push(`/notebooks/${notebook.id}/${createPageData.createPage.id}`);
    }
  }, [createPageData]);

  return (
    <nav className="w-[300px] p-2 whitespace-nowrap">
      <div className="flex justify-between">
        <p className="pt-3 pb-6 font-bold text-xl text-ellipsis overflow-hidden" title={notebook.title}>{notebook.title}</p>
        <PlusIcon
          className="w-6 h-6 text-gray-400 cursor-pointer"
          onClick={() => createPage()}
          title="New Page"
        />
      </div>

      <ul>
        {pages?.map((page: Page) => (
          <li
            key={page.id}
            className={`p-1 my-2 cursor-pointer rounded-md ${page.id == currentPageId && "selected"}`}
            onClick={() => {
              router.refresh();
              router.push(`/notebooks/${notebook.id}/${page.id}`)
            }
            }
          >
            <div className="flex justify-between items-center">
              <p className="text-ellipsis overflow-hidden" title={page.title}>{page.title}</p>
              <a href="#" className="text-right"><EllipsisVerticalIcon className="h-5 w-5" /></a>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
