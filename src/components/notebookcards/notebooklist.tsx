import NotebookAddCard from "./notebookadd";
import NotebookCard from "./notebookcard";
import WideNotebookCard from "./widenotebookcard";
import { NotebookData } from "@/app/schemes/Notebook";
interface NotebookListInterface {
    notebooks: NotebookData[];
}

export default function NotebookList(props: NotebookListInterface) {
    return (
        // <div className='flex flex-col pt-8 pr-6 gap-4'>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:gap-8 gap-2 overflow-auto">
            {
                props.notebooks?.map((nb) => (<NotebookCard key={nb.id} title={nb.title} description={nb.description}/>))
            }
            <NotebookAddCard/>
        </div>
    )
}