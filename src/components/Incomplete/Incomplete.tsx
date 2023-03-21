import React, { ChangeEvent } from "react";
import { ITask, TodoStatuses } from "../../lib/Interfaces";
import { deleteTodo } from "../../lib/DatabaseService";

interface Props {
  todos: ITask[];
  handleDeleteIncompleteTask: (id: string) => void;
  handleStatus: (todo: ITask) => void;
  toggleEditModal: (todo: ITask) => void;
  // completeTask(taskToNameDelete: string): void;
}

function Incomplete({
  todos,
  handleDeleteIncompleteTask,
  handleStatus,
  toggleEditModal,
}: Props) {
  return (
    // <div className="megaWrapper">
    //   {todos.length ? (
    <div className="wrapper">
      {todos.map((todo) => (
        <div key={todo.id} className="todoTaskContainer">
          <label htmlFor={todo.id}>
            <input
              className="checkbox"
              type="checkbox"
              id={todo.id}
              // checked={todo.status === TodoStatuses.complete}
              onChange={(e) => handleStatus(todo)}
            />
            <span className="todoName">{todo.taskName}</span>
          </label>

          {/* <span>{task.deadline}</span> */}

          <div className="taskBtns">
            <button className="editBtn" onClick={() => toggleEditModal(todo)}>
              &#9998;
            </button>

            <button
              className="deleteBtn"
              onClick={() => handleDeleteIncompleteTask(todo.id)}
            >
              &#9747;
            </button>
          </div>
        </div>
      ))}
    </div>
    // )
    //     : (
    //     <div className="emptyState">
    //       <p>Empty state goes here</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default Incomplete;
