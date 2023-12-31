
export default function Card(props: Notebook) {
  const title = props.title || '';
  const description = props.description || '';
  // TODO: Fetch notebook 'Last Updated' when implemented on backend
  const lastUpdated = '';
  const href = `notebooks/${props.id}/`

  return (
    <a href={href} className="card min-w-[120px] max-w-[380px]">

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

        <p className="basis-4 font-thin text-xs text-faded tracking-tight text-gray-400">{lastUpdated}</p>

      </div>

    </a>
  )
}
