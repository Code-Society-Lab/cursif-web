import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function CreateNotebookCard({
  option,
  setTitle,
  setDescription,
  onSubmit,
}: {
  option: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onSubmit: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    toggleModal();
  };

  const plusButton = "text-5xl text-center self-center text-faded";
  const newButton = "button bg-new font-medium rounded-lg text-sm px-10 py-2";

  return (
    <>
      <button
        type="button"
        className={option === "New" ? newButton : plusButton}
        onClick={toggleModal}
      >
        {option}
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create a new Notebook
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                  onClick={toggleModal}
                >
                  <XMarkIcon className="w-8 h-8" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    className={`input w-full`}
                    type="text"
                    placeholder="Title"
                    onChange={onTitleChange}
                    required={true}
                  />
                  <input
                    className={`input w-full h-full`}
                    type="text"
                    placeholder="Description"
                    onChange={onDescriptionChange}
                    required={true}
                  />
                  <button type="submit" className="button !bg-accent !text-white">
                    <span className="label">Create</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}