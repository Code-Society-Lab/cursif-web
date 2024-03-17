import { useMutation, gql } from '@apollo/client';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import { Notify } from '@config/notiflix-config';
import { Spinner } from '@/components/loader';

const DELETE_PAGE_MUTATION = gql`
   mutation DeletePage($id: ID!) {
     deletePage(id: $id) {
       id
     }
   }
 `;

export default function DeletePageForm({
  page_id,
  onUpdate,
  onComplete
}: {
  page_id?: string,
  onUpdate: VoidFunction,
  onComplete?: VoidFunction
}) {

  const [deletePage, { data, loading }] = useMutation(DELETE_PAGE_MUTATION, {
    variables: {
      id: page_id,
    },
    onCompleted: () => {
      if (onComplete) {
        onComplete();
        onUpdate();
      }

      Notify.success("Page deleted!");
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-full min-h-[150px]">
        <Spinner size="35px" />
      </div>
    );

  return (
    <div className="p-4 md:p-5">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <span className='flex items-center'>
          <ExclamationTriangleIcon className="h-10 w-10 mr-4 text-red-500" /> Are you sure you want to delete this page?
        </span>

        <div className="flex justify-center">
          <button type="button" onClick={() => deletePage()} className="button bg-delete mr-2">
            <span className="label">Yes</span>
          </button>

          <button type="button" onClick={() => { if (onComplete) onComplete(); }} className="button">
            <span className="label">No</span>
          </button>
        </div>
      </form>
    </div>
  );
}
