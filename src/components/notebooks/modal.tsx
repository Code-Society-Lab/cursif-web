import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Modal({
  buttonTitle,
  modalTitle,
  buttonStyle,
  children,
}: {
  buttonTitle: string;
  modalTitle: string;
  buttonStyle: string;
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        type="button"
        className={buttonStyle}
        onClick={toggleModal}
      >
        {buttonTitle}
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
            <div className="relative card rounded-lg shadow  border border-gray-400">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">
                  {modalTitle}
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
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}