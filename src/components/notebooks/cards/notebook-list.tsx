import NotebookAddCard from "./notebook-add";
import NotebookCard from "./notebook-card";

export default function NotebookList({ notebooks }: NotebookList) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 gap-2 overflow-auto">
      {
        notebooks?.map((notebook) => (
          <NotebookCard key={notebook.id} id={notebook.id} title={notebook.title} description={notebook.description} />
          ))
      }
      <NotebookAddCard />
    </div>
  )
}