import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { useMutation, gql } from '@apollo/client';

import Notify from '@config/notiflix-config';
import { Spinner } from '@/components/loader';

const DELETE_PAGE_MUTATION = gql`
   mutation DeletePage($id: ID!) {
     deletePage(id: $id) {
       id
     }
   }
 `;

export default function PageForm({ page_id, onComplete }: { page_id?: string, onComplete?: VoidFunction }) {
  const router = useRouter();
  const { user } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [deletePage, { data, loading }] = useMutation(DELETE_PAGE_MUTATION, {
    variables: {
      id: page_id,
    },
    onCompleted: (data) => {
      if (onComplete)
        onComplete();

      Notify.success("Page deleted!");
      router.refresh();
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const handleDelete = () => {
    deletePage();
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    return;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full min-h-[150px]">
        <Spinner size="35px" />
      </div>
    );

  return (
    <div className="p-4 md:p-5">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex justify-end">
          {!showConfirmation ? (
            <button type="button" onClick={confirmDelete} className="button bg-delete">
              <span className="label">Delete</span>
            </button>
          ) : (
            <div>
              <p>Are you sure you want to delete this page?</p>
              <button type="button" onClick={handleDelete} className="button bg-delete">
                <span className="label">Yes</span>
              </button>
              <button type="button" onClick={cancelDelete} className="button">
                <span className="label">No</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
