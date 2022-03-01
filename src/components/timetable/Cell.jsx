import React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Cell({ value, setValue, disabled = false, id }) {
  const [cellValue, setCellValue] = useState(value);

  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const saveCellChanges = () => {
    setValue(cellValue);
  };

  return (
    <td className="p-0 cursor-pointer" onClick={openModal}>
      <div
        dangerouslySetInnerHTML={{ __html: value }}
        className="cursor-pointer p-1"
        // type="button"
        data-toggle="modal"
        data-target={`modal-${id}`}
        disabled={disabled}
        type="button"
      ></div>

      {/* <!-- Modal --> */}
      <Modal show={show} onHide={closeModal} size="md" scrollable={true}>
        <ModalBody>
          <ReactQuill value={cellValue} onChange={setCellValue}></ReactQuill>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-sm btn-success" onClick={saveCellChanges}>
            Save
          </button>
        </ModalFooter>
      </Modal>
    </td>
  );
}

export default Cell;
