import React from "react";
import { ITask, TodoStatuses } from "../../lib/Interfaces";
import { deleteTodo } from "../../lib/Funtions";

interface Props {
  todos: ITask[];
  handleDeleteCompleteTask: (id: string) => void;
  handleStatus: (todo: ITask) => void;
}

function Complete({ todos, handleDeleteCompleteTask, handleStatus }: Props) {
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
              // checked={todo.status === TodoStatuses.incomplete}
              onChange={(e) => handleStatus(todo)}
            />
            <span className="todoName">{todo.taskName}</span>
          </label>
          {/* <span>{task.deadline}</span> */}
          <button
            className="deleteBtn"
            onClick={() => handleDeleteCompleteTask(todo.id)}
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

export default Complete;
