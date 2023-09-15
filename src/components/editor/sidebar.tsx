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
      className={isSelected ? "p-2 m-2 rounded-md highlighted" : "p-2 m-2"}
      onClick={() => {
        setSelectedPage(page.id);
      }}
    >
      <p className="text-lg">{page.title}</p>
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
      <p className="text-xl pt-3 pb-6 font-bold">{notebook.title}</p>
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
