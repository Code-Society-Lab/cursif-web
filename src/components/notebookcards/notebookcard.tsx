import { useEffect, useRef, useState } from "react";

export interface NotebookCardInterface {
    title: string;
    description: string;
    lastupdated?: string;
}
export default function NotebookCard(props: NotebookCardInterface) {
    const [titleTooltip, setTitleTooltip] = useState<string>('');
    const [descTooltip, setDescTooltip] = useState<string>('');

    const h1Ref = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);

    const lastUpdated = "Last Updated : " + (props.lastupdated ? props.lastupdated : 'Unknown');

    useEffect(() => {
        if (h1Ref.current) {
            if (h1Ref.current.offsetWidth < h1Ref.current.scrollWidth) {
                setTitleTooltip(props.title);
            } else {
                setTitleTooltip('');
            }
        }
    }, [props.title]);
    useEffect(() => {
        if (descRef.current && (descRef.current.offsetWidth < descRef.current.scrollWidth ||
            descRef.current.offsetHeight < descRef.current.scrollHeight)) {
            setDescTooltip(props.description);
        } else {
            setDescTooltip('');
        }
    }, [props.description]);



    return (
        <a href="#" className="flex flex-col min-w-[120px] max-w-[380px] p-2 rounded-md 
                                bg-[#161616] border border-gray-700 hover:bg-gray-70 hover:shadow-xl transition-shadow duration-300 ease-in-out">

            <div className="flex flex-col pl-2 pt-2 min-h-[100px] max-h-[150px]">

                <span>
                    <h1 title={titleTooltip} ref={h1Ref}
                        className="text-lg font-bold tracking-tight whitespace-nowrap text-gray-900 text-white 
                overflow-hidden text-ellipsis w-min max-w-[95%]">{props.title}</h1>
                </span>
                <span className="basis-16">
                    <p title={descTooltip} ref={descRef}
                        className="font-normal text-sm text-gray-400 overflow-hidden break-all paragraph-wrap-3 max-w-[95%]">{props.description}</p>
                </span>
                <p className="basis-2"></p>
                <p className="font-thin text-xs tracking-tight text-gray-400">{lastUpdated}</p>
            </div>

        </a>
    )
}
