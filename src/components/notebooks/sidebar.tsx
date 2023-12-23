import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";

export function Sidebar({
  notebook,
  currentPageId,
  createPage,
}: {
  notebook: Notebook;
  currentPageId: string;
  createPage: () => void;
}) {
  const router = useRouter();

  return (
    <nav className="w-[300px] p-2 whitespace-nowrap">
      <div className="flex justify-between">
        <p className="pt-3 pb-6 font-bold text-xl text-ellipsis overflow-hidden" title={notebook.title}>{notebook.title}</p>
        <PlusIcon
          className="w-6 h-6 text-gray-400"
          onClick={() => createPage()}
          title="Create New Page" 
        />
      </div>

      <ul>
        {notebook?.pages?.map((page: Page) => (
          <li
            key={page.id}
            className={`p-1 my-2 cursor-pointer rounded-md ${page.id == currentPageId && "selected"}`}
            onClick={() => router.push(`/notebooks/${notebook.id}/${page.id}`)}
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
