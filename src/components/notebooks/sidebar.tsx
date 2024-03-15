import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { Modal, openModal } from '@/components/modal';
import NotebookForm from '@/components/notebooks/form';

export function Sidebar({
  notebook,
  currentPageId,
}: {
  notebook: Notebook;
  currentPageId: string;
}) {
  const router = useRouter();

  return (
    <nav className="w-[300px] p-2">
      <div className="flex justify-between">
        <p className="pt-3 pb-6 font-bold text-xl text-ellipsis overflow-hidden" title={notebook.title}>{notebook.title}</p>
        <span className='cursor-pointer' title="Update Notebook">
          <Cog8ToothIcon className="h-5 w-5" onClick={() => openModal('update-notebook-modal')}/>
        </span>
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
              <a href="#" className="text-right" title="Update Page"><EllipsisVerticalIcon className="h-5 w-5" /></a>
            </div>
          </li>
        ))}
      </ul>

      <Modal id='update-notebook-modal' title='Update Notebook'>
        <NotebookForm notebook={notebook} />
      </Modal>
    </nav>
  );
}
