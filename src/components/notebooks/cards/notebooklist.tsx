import NotebookAddCard from "./notebookadd";
import NotebookCard from "./notebookcard";
interface NotebookListInterface {
    notebooks: Notebook[];
}

export default function NotebookList(props: NotebookListInterface) {
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 gap-2 overflow-auto">
            {
                props.notebooks?.map((nb) => (<NotebookCard key={nb.id} id={nb.id} title={nb.title} description={nb.description} />))
            }
            <NotebookAddCard />
        </div>
    )
}