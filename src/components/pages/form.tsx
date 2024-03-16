import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { useMutation, gql } from '@apollo/client';

import Notify from '@config/notiflix-config';
import { Spinner } from '@/components/loader';

const UPDATE_PAGE_MUTATION = gql`
   mutation UpdatePage($id: ID!, $content: String, $title: String) {
     updatePage(id: $id, content: $content, title: $title) {
       id
       title
       content
     }
   }
 `;

export default function PageForm({ page, onComplete }: { page?: string, onComplete?: VoidFunction }) {
  const router = useRouter();
  const { user } = useAuth();
  console.log(page);

  const [title, setTitle] = useState('');

  const [updatePage, { data, loading}] = useMutation(UPDATE_PAGE_MUTATION, {
    variables: {
      id: page,
    },
    onCompleted: (data) => {
      if (onComplete)
        onComplete();

      Notify.success("Page updated!");
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePage({ variables: { title } });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full min-h-[150px]">
        <Spinner size="35px" />
      </div>
    );

  return (
    <div className="p-4 md:p-5">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="input w-full"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <div className="flex justify-end">
          <button type="submit" className="button bg-new">
            <span className="label">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}
