import React, { ChangeEvent, FormEvent, useState } from "react";
import "./EditModal.css";
import { ITask, TodoStatuses } from "../../lib/Interfaces";

interface Props {
  // showEditModal: () => void;
  // hideEditModal: () => void;
  toggleEditModal: (todo: ITask) => void;
  editTodo: (id: string, newTodoName: string) => void;
  todo: ITask;
  handleAdd: (todo: ITask, status: TodoStatuses) => void;
}

function EditModal({ toggleEditModal, editTodo, todo, handleAdd }: Props) {
  const { taskName, id, status } = todo;

  const [newTodoName, setNewTodoName] = useState<string>(taskName);

  const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  // const updatedTodo = { newTodoName };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(id, newTodoName);
    // updatedTodo;
    setNewTodoName("");
    toggleEditModal(todo);

    // console.log(newTodoName);
  };

  return (
    <form action="" className="formModal" onSubmit={handleSubmit}>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="modalCloseButton">
            <button onClick={() => toggleEditModal(todo)}>X</button>
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
              onClick={() => toggleEditModal(todo)}
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
