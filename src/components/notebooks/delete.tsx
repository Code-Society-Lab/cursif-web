import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Spinner } from '@/components/loader';
import { Notify } from '@config/notiflix-config';
import { useMutation, gql } from '@apollo/client';

const DELETE_NOTEBOOK_MUTATION = gql`
  mutation DeleteNotebook($id: ID!) {
    deleteNotebook(id: $id) {
      id
    }
  }
`;

export default function DeleteNotebookForm({
  notebook,
  onComplete,
  onUpdate,
}: {
  notebook?: Notebook,
  onComplete?: VoidFunction,
  onUpdate: VoidFunction,
}) {
  const [title, setTitle] = useState('');

  const router = useRouter();
  const [deleteNotebook, { data, loading, error }] = useMutation(DELETE_NOTEBOOK_MUTATION, {
    variables: {
      id: notebook?.id,
    },
    onCompleted: () => {

      if (onComplete) {
        onComplete();
        onUpdate();
      }
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
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <div className='text-sm font-bold'>
            Enter &apos;{ notebook?.title }&apos; to confirm
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={notebook?.title}
            className="input px-3 py-2 mt-4 w-[80%]"
          />
        </div>

        <div className="flex justify-center">
          <button type="button" onClick={() => deleteNotebook()} className="button bg-delete" disabled={title.trim() !== (notebook?.title)}>
            <span className="label" >Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
}
