export interface NotebookCardInterface {
    id: string;
    title?: string;
    description?: string;
    lastupdated?: string;
}
export default function NotebookCard(props: NotebookCardInterface) {
    const title = (props.title) ? props.title : '';
    const description = (props.description) ? props.description : '';
    const lastUpdated = "Last Updated : " + (props.lastupdated ? props.lastupdated : 'Unknown');
    const href = `notebooks/${props.id}/`

    return (
        <a href={href} className="flex flex-col min-w-[120px] max-w-[380px] p-2 rounded-md 
                                bg-component hover:shadow-xl transition-shadow duration-300 ease-in-out">

            <div className="flex flex-col pl-2 pt-2 min-h-[100px] max-h-[150px]">
                <span>
                    <h1 title={title}
                        className="text-lg font-bold tracking-tight whitespace-nowrap 
                overflow-hidden text-ellipsis w-min max-w-[95%]">{title}</h1>
                </span>

                <span className="basis-16">
                    <p title={description}
                        className="font-normal text-sm text-secondary overflow-hidden break-all paragraph-wrap-3 max-w-[95%]">
                        {description}
                    </p>
                </span>

                <p className="basis-2"></p>
                <p className="font-thin text-xs text-faded tracking-tight text-gray-400">{lastUpdated}</p>

            </div>

        </a>
    )
}
