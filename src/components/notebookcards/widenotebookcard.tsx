
interface NotebookCardInterface {
    title?: string;
    description?: string;
    lastupdated?: string;
}
export default function WideNotebookCard(props: NotebookCardInterface) {
    const lastUpdated = (props.lastupdated ? "Last Updated : " + props.lastupdated : '');

    return (
        <a href="#/" className="flex flex-col w-full p-2 rounded-md 
                                dark:bg-gray-900 border border-gray-700 hover:bg-gray-70 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex flex-col pl-2 pt-2 min-h-[100px] max-h-[150px]">
                <h1 className="text-lg font-bold tracking-tight whitespace-nowrap text-gray-900 text-white overflow-hidden text-ellipsis max-w-[75%]">{props.title}</h1>
                <p className="font-normal text-sm text-gray-400 overflow-hidden text-ellipsis max-w-[75%]">{props.description}</p>
                <p className="basis-12"></p>
                <p className="font-thin text-xs tracking-tight text-gray-400">{lastUpdated}</p>                
            </div>
        </a>
    )
}