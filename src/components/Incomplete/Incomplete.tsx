import React, { ChangeEvent } from "react";
import { ITask, TodoStatuses } from "../../lib/Interfaces";
import { deleteTodo } from "../../lib/Funtions";

interface Props {
  todos: ITask[];
  handleDeleteTask: (id: string) => void;
  handleStatus: (todo: ITask) => void;
  // completeTask(taskToNameDelete: string): void;
}

function Incomplete({ todos, handleDeleteTask, handleStatus }: Props) {
  const editMode = () => {
    console.log("edit mode");
  };

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
            <span
              // contentEditable={true}
              // suppressContentEditableWarning={true}
              className="todoName"
              onFocus={editMode}
            >
              {/* {" "} */}
              {todo.taskName}
            </span>
          </label>

          {/* <span>{task.deadline}</span> */}
          <button
            className="deleteBtn"
            onClick={() => handleDeleteTask(todo.id)}
          >
            &#9747;
          </button>
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
