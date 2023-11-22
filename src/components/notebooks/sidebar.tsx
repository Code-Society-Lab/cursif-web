import { EllipsisVerticalIcon, BookOpenIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export function Sidebar({
  notebook,
  currentPageId,
}: {
  notebook: Notebook;
  currentPageId: string;
}) {
  const router = useRouter();

  return (
    <nav className="w-[300px] p-2 whitespace-nowrap">
      <div className="flex justify-center items-center">
        <p className="pt-3 pb-6 font-bold text-xl text-ellipsis overflow-hidden" title={notebook.title}>{notebook.title}</p>
      </div>

      <ul>
        {notebook.pages.map((page: Page) => (
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
      <span>
        <a href="/notebooks" className="fixed bottom-5 left-0 p-4 icon-mark text-xs">
          <BookOpenIcon className="h-5 w-5 mb-2" />
          <span className="ml-2 mb-2">My Notebooks</span>
        </a>
        <a href="settings" className="fixed bottom-0 left-0 p-4 icon-mark text-xs">
          <Cog8ToothIcon className="h-5 w-5" />
          <span className="ml-2">Settings</span>
        </a>
      </span>
    </nav>
  );
}
