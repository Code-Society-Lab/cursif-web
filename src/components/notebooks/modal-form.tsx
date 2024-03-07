import { useState } from 'react';
import Modal from '@/components/notebooks/modal';

export default function ModalForm({
  modalFormID,
  modalFormTitle,
  onSubmit,
  onClose,
}: {
  modalFormID: string;
  modalFormTitle: string;
  onSubmit: (title: string, description: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(title, description);
    onClose();
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <Modal
        id={modalFormID}
        title={modalFormTitle}
        onClose={onClose}
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
    </div>
  );
}
