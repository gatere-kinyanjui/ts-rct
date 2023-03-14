import React, { ChangeEvent, FormEvent, useState } from "react";
import "./EditModal.css";
import { ITask, TodoStatuses } from "../../lib/Interfaces";

interface Props {
  // showEditModal: () => void;
  // hideEditModal: () => void;
  toggleEditModal: () => void;
  editTodo: any;
}

function EditModal({ toggleEditModal, editTodo }: Props) {
  const [newTodoName, setNewTodoName] = useState<string>();

  const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodoName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(newTodoName);
    setNewTodoName("");

    console.log(newTodoName);
  };

  return (
    <form action="" className="formModal" onSubmit={handleSubmit}>
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
              value={newTodoName}
              placeholder="new todo name"
              onChange={handleEdit}
              required
              autoComplete="off"
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
    </form>
  );
}

export default EditModal;
