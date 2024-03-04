import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Modal({
  id,
  title,
  onClose,
  children,
}: {
  id: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative card rounded-lg shadow border border-gray-400">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="whitespace-nowrap text-xl font-semibold text-ellipsis overflow-hidden">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg inline-flex justify-center items-center"
              data-modal-hide={id}
              onClick={onClose}
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
  );
}
