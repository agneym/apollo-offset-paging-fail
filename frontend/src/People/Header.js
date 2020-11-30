import "twin.macro";
import { useState } from 'react';

import Modal from "../Modal";

function Header({ totalCount }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <header tw="my-10 flex justify-between">
      <div>
        <h2 tw="text-2xl font-bold">People</h2>
        <sub tw="text-sm text-gray-500">{totalCount} total results</sub>
      </div>
      <Modal
        targetEl={
          <button
            tw="border border-pink-500 text-black font-bold uppercase text-sm px-4 py-1 rounded shadow-sm hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
          >
            Add Person
          </button>
        }
        modalTitle='Add Person'
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <Modal.Body>
          <p>Modal Contnet</p>
        </Modal.Body>
        <Modal.Footer onSave={() => setShowModal(false)} onClose={() => setShowModal(false)} />
      </Modal>
    </header>
  );
}

export default Header;
