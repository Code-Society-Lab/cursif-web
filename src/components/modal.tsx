import { XMarkIcon } from '@heroicons/react/24/solid';

function _getModal(id: string): HTMLDialogElement | null {
  return document.getElementById(id) as HTMLDialogElement;
}

export function openModal(id: string) {
  _getModal(id)?.showModal();
}

export function closeModal(id: string) {
  _getModal(id)?.close();
}

export function Modal({
  id,
  title,
  children,
  maxSize,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  maxSize?: string;
}) {
  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest('dialog')) {
      if ((e.target as Element).closest('.modal')) return;
      closeModal(id);
    }
  });

  return (
    <>
      <dialog id={id}>
        <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className={`modal relative w-full ${ maxSize || 'max-w-md' } max-h-full`}>
            <div className="bg-modal relative rounded-lg">
              <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                <h3 className="whitespace-nowrap font-semibold text-xl text-ellipsis overflow-hidden">
                  {title}
                </h3>

                <button className="hover:bg-component rounded-lg inline-flex justify-center items-center" onClick={() => closeModal(id)}>
                  <XMarkIcon className="w-8 h-8" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
