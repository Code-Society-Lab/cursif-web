import { useState } from 'react';
import Modal from '@/components/notebooks/modal';

export default function CreateNotebookCard({
  buttonTitle,
  onSubmit,
}: {
  buttonTitle: string;
  onSubmit: (title: string, description: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(title, description);
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCardClick = (event) => {
    if (!event.target.closest('#new-notebook-modal')) {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const plusButtonStyle = "text-5xl text-center self-center text-faded";
  const newButtonStyle  = "button bg-new font-medium rounded-lg text-sm px-10 py-2";
  const buttonStyle     = buttonTitle === "+" ? plusButtonStyle : newButtonStyle;

  return (
    <div onClick={(event) => handleCardClick(event)} className="cursor-pointer flex flex-col justify-center items-center h-full">
      <button
        type="button"
        className={buttonStyle}
        onClick={() => setIsModalOpen(true)}
      >
        {buttonTitle}
      </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-lg"></div>
      )}

      {isModalOpen && (
        <Modal
          id="new-notebook-modal"
          title="New Notebook"
          onClose={() => {
            setIsModalOpen(false)
            document.body.style.overflow = "auto"
          }
          }
        >
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className={`input w-full bg-modal border`}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
              <textarea
                id="message"
                rows={4}
                className='block resize-none p-2 w-full bg-modal rounded-lg border'
                placeholder="Write your notebook description here... (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={false}
              />

              <div className="flex justify-end">
                <button type="submit" className="button bg-new">
                  <span className="label">Create</span>
                </button>
              </div>

            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
