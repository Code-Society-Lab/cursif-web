import { useMutation, gql } from '@apollo/client';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import { Notify } from '@config/notiflix-config';
import { Spinner } from '@/components/loader';
import { useRouter } from "next/navigation";

const DELETE_NOTEBOOK_MUTATION = gql`
   mutation DeleteNotebook($id: ID!) {
     deleteNotebook(id: $id) {
       id
     }
   }
 `;

export default function DeleteNotebookForm({
  notebook_id,
  onComplete
}: {
  notebook_id?: string,
  onComplete?: VoidFunction
}) {
  const router = useRouter();
  const [deleteNotebook, { data, loading, error }] = useMutation(DELETE_NOTEBOOK_MUTATION, {
    variables: {
      id: notebook_id,
    },
    onCompleted: () => {
      if (onComplete) {
        onComplete();
      }
      router.push(`/notebooks`);
      Notify.success("Notebook deleted!");
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

  if (error)
    return <div>Error loading notebook: {error.message}</div>;

  return (
    <div className="p-4 md:p-5">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <span className='text-center p-4'>
          <ExclamationTriangleIcon className="h-20 w-20 m-auto text-red-500" /> 

          <div className='text-3xl font-bold pb-2'>Are you sure?</div>
          <div>Do you really want to delete this notebook? This action is irreversible.</div>
        </span>

        <div className="flex justify-center">
          <button type="button" onClick={() => deleteNotebook()} className="button bg-delete mr-2">
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
