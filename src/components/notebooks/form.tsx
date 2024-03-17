import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { useMutation, gql } from '@apollo/client';

import { Notify } from '@config/notiflix-config';
import { Spinner } from '@/components/loader';

const CREATE_NOTEBOOK_MUTATION = gql`
  mutation CreateNotebook($title: String!, $description: String, $ownerId: ID!) {
    createNotebook(title: $title, description: $description, ownerId: $ownerId) {
      id
      title
      description
    }
  }
`;

const UPDATE_NOTEBOOK_MUTATION = gql`
  mutation UpdateNotebook($title: String!, $id: ID!, $description: String, $ownerId: ID!) {
    updateNotebook(title: $title, id: $id, description: $description, ownerId: $ownerId) {
      id
      title
      description
    }
  }
`;

export default function NotebookForm({ notebook, onComplete }: { notebook?: Notebook, onComplete?: VoidFunction }) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(notebook?.title);
  const [description, setDescription] = useState(notebook?.description);

  const [createNotebook, { loading: createLoading }] = useMutation(CREATE_NOTEBOOK_MUTATION, {
    variables: {
      ownerId: user?.id,
      ownerType: "user",
    },
    onCompleted: (data) => {
      if (onComplete)
        onComplete();

      Notify.success("Notebook created!");
      router.push(`/notebooks/${data.createNotebook.id}`);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const [updateNotebook, { loading: updateLoading }] = useMutation(UPDATE_NOTEBOOK_MUTATION, {
    variables: {
      id: notebook?.id,
      ownerId: user?.id,
      ownerType: "user",
    },
    onCompleted: (data) => {
      if (onComplete)
        onComplete();

      Notify.success("Notebook updated!");
      router.push(`/notebooks/${data.updateNotebook.id}`);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (notebook) {
      updateNotebook({ variables: { title, description } });
    } else {
      createNotebook({ variables: { title, description } });
    }
  };

  if (createLoading || updateLoading)
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
        <textarea
          rows={4}
          maxLength={200}
          className="input w-full resize-none"
          placeholder="Write your notebook description here... (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={false}
        />
        <div className="flex justify-end">
          <button type="submit" className="button bg-new">
            <span className="label">{notebook ? 'Save' : 'Create'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
