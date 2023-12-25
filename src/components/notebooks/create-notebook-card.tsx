import Modal from '@/components/notebooks/modal';

export default function CreateNotebookCard({
  buttonTitle,
  setTitle,
  setDescription,
  onSubmit,
}: {
  buttonTitle: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onSubmit: () => void;
}) {
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const plusButtonStyle = "text-5xl text-center self-center text-faded";
  const newButtonStyle = "button bg-new font-medium rounded-lg text-sm px-10 py-2";

  return (
    <>
      <Modal
        modalTitle="Create a new Notebook"
        buttonTitle={buttonTitle}
        buttonStyle={buttonTitle === "New" ? newButtonStyle : plusButtonStyle}
      >
        <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className={`block p-2.5 w-full bg-modal rounded-lg border`}
              type="text"
              placeholder="Title"
              onChange={onTitleChange}
              required={true}
            />
            <textarea
              id="message"
              rows={4}
              className='block resize-none p-2 w-full bg-modal rounded-lg border'
              placeholder="Write your notebook description here..."
              onChange={onDescriptionChange}
              required={false}
            />

            <div className="flex justify-end">
              <button type="submit" className="button bg-new !text-white">
                <span className="label">Create</span>
              </button>
            </div>

          </form>
        </div>
      </Modal>
    </>
  );
}