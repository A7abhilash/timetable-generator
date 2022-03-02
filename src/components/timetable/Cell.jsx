import React, { useState } from "react";
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
    closeModal();
  };

  return (
    <>
      <td
        className="p-0 cursor-pointer"
        onClick={!disabled ? openModal : () => {}}
      >
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className="p-2 text-center"
        ></div>
      </td>

      {/* <!-- Modal --> */}
      {show && (
        <Modal
          show={show}
          onHide={closeModal}
          size="md"
          centered
          animation="fade"
        >
          <ModalBody>
            <ReactQuill value={cellValue} onChange={setCellValue}></ReactQuill>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={saveCellChanges}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

export default Cell;
