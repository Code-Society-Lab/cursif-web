import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

function PageSelect({
  page,
  selectedPage,
  setSelectedPage,
}: {
  page: any;
  selectedPage: string;
  setSelectedPage: any;
}) {
  const isSelected = selectedPage === page.id;

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
  setSelectedPage,
}: {
  notebook: any;
  selectedPage: string;
  setSelectedPage: any;
}) {
  return (
    <div className="sidebar">
      <div className="flex justify-between">
        <p className="text-xl pt-3 pb-6 font-bold">{notebook.title}</p>
        <a href="#" className="text-right"><Cog8ToothIcon className="h-5 w-5" /></a>
      </div>
      
      {notebook.pages.map((page: any) => (
        <PageSelect
          page={page}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      ))}
    </div>
  );
}
