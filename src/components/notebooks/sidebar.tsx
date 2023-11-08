import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

function PageTab({
  page,
  isSelected,
  setSelectedPage,
}: {
  page: Page;
  isSelected: boolean;
  setSelectedPage: any;
}) {
  return (
    <div
      className={`p-2 m-2 cursor-pointer rounded-md ${isSelected && "highlighted"}`}
      onClick={() => {
        setSelectedPage(page.id);
      }}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg">{page.title}</p>
        <a href="#" className="text-right"><EllipsisVerticalIcon className="h-5 w-5" /></a>
      </div>
    </div>
  );
}

export function Sidebar({
  notebook,
  selectedPage,
  setSelectedPage: setSelectedPage,
}: {
  notebook: Notebook;
  selectedPage: Page["id"];
  setSelectedPage: any;
}) {
  return (
    <div className="sidebar">
      <div className="flex justify-between">
        <p className="text-xl pt-3 pb-6 font-bold">{notebook.title}</p>
        <a href="#" className="text-right"><Cog8ToothIcon className="h-5 w-5" /></a>
      </div>

      {notebook.pages.map((page: Page) => (
        <PageTab
          key={page.id}
          page={page}
          isSelected={selectedPage === page.id}
          setSelectedPage={setSelectedPage}
        />
      ))
      }
    </div>
  );
}
