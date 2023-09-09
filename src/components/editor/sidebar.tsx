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
      className={isSelected ? "p-2 rounded-md highlighted" : "p-2"}
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
      <p className="text-xl pb-5 font-bold">{notebook.title}</p>
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
