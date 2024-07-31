import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/loader';
import { Notify } from '@config/notiflix-config';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '@/components/auth-provider';
import { Modal, openModal, closeModal } from '@/components/modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import DeleteNotebookForm from '@/components/notebooks/delete';

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

const ADD_COLLABORATOR = gql`
  mutation AddCollaborator($notebookId: ID!, $userId: ID, $email: String!) {
    addCollaborator(notebookId: $notebookId, userId: $userId, email: $email) {
      id
    }
  }
`;

const DELETE_COLLABORATOR = gql`
  mutation DeleteCollaborator($notebookId: ID!, $userId: ID!) {
    deleteCollaborator(notebookId: $notebookId, userId: $userId) {
      id
    }
  }
`;


export default function NotebookForm({ 
  notebook,
  onUpdate,
  onComplete
}: {
  notebook?: Notebook,
  onUpdate: VoidFunction,
  onComplete?: VoidFunction
}) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(notebook?.title);
  const [description, setDescription] = useState(notebook?.description);

  const [email, setEmail] = useState('');

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

  const [addCollaborator] = useMutation(ADD_COLLABORATOR, {
    onCompleted: () => {
      if (onComplete) {
        onComplete();
        onUpdate();
      }

      Notify.success("Collaborator added!");
      router.push(`/notebooks/${notebook?.id}`);
    },
    onError: (error) => {
      Notify.failure(`${error.message}!`);
    },
  });

  const [deleteCollaborator] = useMutation(DELETE_COLLABORATOR, {
    onCompleted: () => {
      if (onComplete) {
        onComplete();
        onUpdate();
      }

      Notify.success("Collaborator removed!");
      router.push(`/notebooks/${notebook?.id}`);
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

  const onAddCollaborator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.includes('@')) {
      addCollaborator({ variables: { notebookId: notebook?.id, email: email } });
    } else {
      addCollaborator({ variables: { notebookId: notebook?.id, userId: email } });
    }
  }

  if (createLoading || updateLoading)
    return (
      <div className="flex items-center justify-center h-full min-h-[150px]">
        <Spinner size="35px" />
      </div>
    );

  return (
    <div className="p-4 md:p-5">
      {notebook && (
        <div className="font-bold my-2">General</div>
      )}
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
      {notebook && user?.id == notebook?.owner?.id && (
        <>
          <hr className="my-4" />
          <div className="flex items-center mb-2">
            Collaborators
          </div>
          <form onSubmit={onAddCollaborator} className="flex space-x-4 mb-4 w-full">
            <input
              className="input flex-grow"
              type="email"
              placeholder="Collaborator email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="button bg-new">
              <span className="label">Add</span>
            </button>
          </form>
          {notebook?.collaborators?.length > 0 && (
            <div className="mt-4">
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="bg-table min-w-full table-auto divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-9 text-center">Email</th>
                      <th className="py-3 px-9 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notebook?.collaborators?.map((collaborator) => (
                      <tr key={collaborator.id}>
                        <td className="py-2 px-6 truncate">{collaborator.username}</td>
                        <td className="py-2 px-6 truncate text-center">{collaborator.email}</td>
                        <td className="py-2 px-6 text-right">
                          <button
                            className="button bg-delete py-1 px-3 rounded"
                            onClick={() => deleteCollaborator({ variables: { notebookId: notebook?.id, userId: collaborator.id } })}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      {notebook && (
        <>
          <hr className="my-4" />
          <div className='flex items-center font-bold my-2'>
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-1" /> Danger Zone
          </div>
          <div className="flex items-center border rounded-lg border-red-600 p-2">
            <div>
              <p className="font-bold">Delete this notebook.</p>
              <p>This action is irreversible. All pages in this notebook will be deleted.</p>
            </div>
            <span>
              <button className='button bg-delete ml-2' onClick={() => openModal('delete-notebook-modal')}>
                Delete
              </button>
            </span>
          </div>
          <Modal id='delete-notebook-modal' title='Delete Notebook'>
            <DeleteNotebookForm notebook={notebook} onComplete={() => { closeModal('delete-notebook-modal'); }} onUpdate={() => router.push(`/notebooks`)} />
          </Modal>
        </>
      )}
    </div>
  );
}
