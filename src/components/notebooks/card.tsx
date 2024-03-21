import moment from 'moment';

export default function Card({ notebook }: { notebook?: Notebook }) {
  let editedText = '';

  if (notebook) {
    // If the notebook has been updated, use the updated time as the edited time
    const notebookUpdatedAt = notebook.updated_at ? moment.utc(notebook.updated_at).local() : null;
    const mostRecentPageUpdate = notebook.pages ? moment.max(notebook.pages.map(page => moment.utc(page.updated_at).local())) : null;

    // If the notebook has no pages, use the notebook updated time else use the most recent page updated time
    if (notebook.pages && notebook.pages.length < 1) {
      editedText = notebookUpdatedAt ? notebookUpdatedAt.fromNow() : '';
    } else if (mostRecentPageUpdate && (!notebookUpdatedAt || mostRecentPageUpdate.isAfter(notebookUpdatedAt))) {
      editedText = mostRecentPageUpdate.fromNow();
    } else if (notebookUpdatedAt) {
      editedText = notebookUpdatedAt.fromNow();
    }
  }

  return (
    <a key={notebook?.id} href={`notebooks/${notebook?.id}/`} className="card md:w-full min-w-[250px]">
      <div className="flex flex-col pl-2 pt-2 ">
        <span>
          <h1
            title={notebook?.title}
            className="text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-min max-w-[95%]"
          >
            {notebook?.title}
          </h1>
        </span>

        <span className="basis-16">
          <p
            title={notebook?.description}
            className="font-normal text-sm text-secondary overflow-hidden break-all paragraph-wrap-3 max-w-[95%]"
          >
            {notebook?.description}
          </p>
        </span>

        <p className="basis-4 font-thin text-xs text--faded tracking-tight text-gray-400">
          {`Edited ${editedText}`}
        </p>
      </div>
    </a>
  );
}
