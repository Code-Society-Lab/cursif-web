export default function Card(props: Notebook) {
  const title = props.title || "";
  const description = props.description || "";

  // Formats the received date for UI
  // Adds '0' to single digit date parts
  const padNumber = (num: number) => {
    return num.toLocaleString("en-US", { minimumIntegerDigits: 2 });
  };

  // Converts the received date to Date object
  const lastUpdatedDate =
    new Date(props.lastUpdated) || new Date().toDateString();

  // Formats the date for UI
  const lastUpdated =
    padNumber(lastUpdatedDate.getDate()) +
    "-" +
    padNumber(lastUpdatedDate.getMonth() + 1) +
    "-" +
    lastUpdatedDate.getFullYear();

  const href = `notebooks/${props.id}/`;
  return (
    <a href={href} className="card min-w-[120px] max-w-[380px]">
      <div className="flex flex-col pl-2 pt-2 min-h-[100px] max-h-[150px]">
        <span>
          <h1
            title={title}
            className="text-lg font-bold tracking-tight whitespace-nowrap 
                overflow-hidden text-ellipsis w-min max-w-[95%]"
          >
            {title}
          </h1>
        </span>

        <span className="basis-16">
          <p
            title={description}
            className="font-normal text-sm text-secondary overflow-hidden break-all paragraph-wrap-3 max-w-[95%]"
          >
            {description}
          </p>
        </span>

        <p
          title={lastUpdated}
          className="basis-4 font-thin text-xs text-faded tracking-tight text-gray-400"
        >
          Last updated: {lastUpdated}
        </p>
      </div>
    </a>
  );
}
