import React, { useState } from "react";

interface Props {
  // showEditModal: () => void;
  // hideEditModal: () => void;
  toggleEditModal: () => void;
}

function EditModal({
  toggleEditModal,
}: // showEditModal,
// hideEditModal,
Props) {
  return (
    <div className="modalContainer">
      <h4>Edit Todo</h4>
      <input type="text" name="editedTodo" id="" placeholder="new todo name" />
      <button
        className="cancelEditedTodo"
        type="reset"
        // onClick={toggleEditModal}
        onClick={toggleEditModal}
      >
        &#8339;
      </button>
      <button className="confirmEditedTodo" type="submit">
        &#10003;
      </button>
    </div>
  );
}

export default EditModal;
