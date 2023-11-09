import {useRef, useEffect, useState} from 'react';
import { NotebookCardInterface } from "./notebookcard"
import NotebookCard from "./notebookcard";

interface NBCarouselInterface {
    title?: string
    cards?: NotebookCardInterface[];
}



export default function NotebookCardCarousel(props: NBCarouselInterface) {
    const scrollbar = useRef<null | HTMLDivElement>(null);
    const cardWidth = useRef<null | HTMLSpanElement>(null);
    const [width, setWidth] = useState<number>(0)

    useEffect(() => { setWidth((cardWidth.current) ? cardWidth.current?.offsetWidth : 100); }, [cardWidth])
    const rightScroll = () => { 
        let travel = 0;
        let timer = setInterval(() => {
            if (!scrollbar.current) return;
            scrollbar.current.scrollLeft += 10;
            travel += 5;
            if (travel >= width/2) window.clearInterval(timer);
        }, 0)
    }
    const leftScroll = () => {
        let dist = 200;
        let travel = 0;
        let timer = setInterval(() => {
            if (!scrollbar.current) return;
            scrollbar.current.scrollLeft -= 10;
            travel += 5;
            if (travel >= width/2) window.clearInterval(timer);
        }, 0)
    }

    return (
        <div>

            <h1 className='pl-2 font-bold'>{props.title}</h1>
            <div className='flex flex-row'>
                <button onClick={leftScroll}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="grid gap-4 auto-cols-[380px] grid-rows-1 overflow-x-scroll grid-flow-col scrollbar-hide" ref={scrollbar}>
                    <span ref={cardWidth}>
                    <NotebookCard title='My favorite notebook' description='The description of the notebook' lastupdated='09-27-2023'/>
                    </span>
                    <NotebookCard/>
                    <NotebookCard/>
                    <NotebookCard/>
                </div>

                <button className="pr-2" onClick={rightScroll}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

        </div>

    )
}