import NotebookCard from "./notebookcard";
import WideNotebookCard from "./widenotebookcard";
import { NotebookData } from "@/app/schemes/Notebook";
interface NotebookListInterface {
    notebooks: NotebookData[];
}

export default function NotebookList(props: NotebookListInterface) {
    return (
        // <div className='flex flex-col pt-8 pr-6 gap-4'>
        <div className="grid grid-cols-3 gap-8">
            {
                props.notebooks?.map((nb) => (<NotebookCard key={nb.id} title={nb.title} description={nb.description}/>))
            }
        </div>
    )
}