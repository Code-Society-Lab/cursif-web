import moment from 'moment';
import Link from 'next/link'

export default function Card({ notebook }: { notebook: Notebook }) {
  return (
    <Link key={notebook.id} href={`notebooks/${notebook.id}/`} className="card md:w-full min-w-[250px]">
      <div className="flex flex-col pl-2 pt-2 ">
        <span>
          <h1
            title={notebook.title}
            className="text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-min max-w-[95%]"
          >
            {notebook?.title}
          </h1>
        </span>

        <span className="basis-16">
          <p
            title={notebook.description}
            className="font-normal text-sm text-secondary overflow-hidden break-all paragraph-wrap-3 max-w-[95%]"
          >
            {notebook.description}
          </p>
        </span>

        <p className="basis-4 font-thin text-xs text--faded tracking-tight text-gray-400">
          {`Edited ${moment.utc(notebook.updated_at).fromNow()}`}
        </p>
      </div>
    </Link>
  );
}
