import React, { useState } from "react";

const Modal = ({ isOpen = false, content, stillOpen }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <>
      {open ? (
        <div>
          <div
            id="popup-modal"
            tabIndex="-1"
            className="absolute bottom-0 top-0 h-screen w-full inset-0 flex items-center justify-center shadow-lg shadow-indigo-500/40 backdrop-blur-sm bg-indigo-500/10"
          >
            <div className="absolute z-100 w-full max-w-lg max-h-screen">
              <div className="relative rounded-lg shadow">
                <button
                  onClick={() => {
                    setOpen(false), stillOpen(false);
                  }}
                  type="button"
                  className="absolute z-10 top-8 end-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 my-5 md:p-5">{content}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
