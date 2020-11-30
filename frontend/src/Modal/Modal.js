import "twin.macro";
import { cloneElement, useState } from "react";

const ModalBody = ({ children }) => {
  return <div tw="relative p-6 flex-auto">{children}</div>;
};

const ModalFooter = ({ onSave, onClose }) => {
  return (
    <div tw="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
      <button
        tw="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={onClose}
      >
        Close
      </button>
      <button
        tw="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
};

function Modal({ targetEl, modalTitle, children, showModal, setShowModal }) {
  const button = cloneElement(targetEl, { onClick: () => setShowModal(true) });
  return (
    <>
      {button}
      {showModal ? (
        <dialog open={showModal}>
          <div
            tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div tw="relative w-auto my-6 mx-auto max-w-3xl">
              <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div tw="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 tw="text-3xl font-semibold">{modalTitle}</h3>
                  <button
                    tw="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span tw=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
          <div tw="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </dialog>
      ) : null}
    </>
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
