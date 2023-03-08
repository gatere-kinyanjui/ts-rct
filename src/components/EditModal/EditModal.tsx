import React, { useState } from "react";
import "./EditModal.css";

interface Props {
  // showEditModal: () => void;
  // hideEditModal: () => void;
  toggleEditModal: () => void;
}

function EditModal({ toggleEditModal }: Props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalCloseButton">
          <button onClick={toggleEditModal}>X</button>
        </div>

        <div className="modalTitle">
          <h4>Edit Todo</h4>
        </div>

        <div className="modalBody">
          <input
            className="modalInput"
            type="text"
            name="editedTodo"
            placeholder="new todo name"
          />
        </div>

        <div className="modalFooter">
          <button
            className="cancelEditedTodo"
            type="reset"
            id="cancelBtn"
            onClick={toggleEditModal}
          >
            &#9747;
          </button>
          <button className="confirmEditedTodo" type="submit">
            &#10003;
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
