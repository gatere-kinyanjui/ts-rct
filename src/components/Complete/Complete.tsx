import React from "react";
import { ITask, TodoStatuses } from "../../lib/Interfaces";
import { deleteTodo } from "../../lib/Funtions";

interface Props {
  todos: ITask[];
  handleDeleteTask: (id: string) => void;
  handleStatus: (todo: ITask) => void;
  // completeTask(taskToNameDelete: string): void;
}

const Complete = ({ todos, handleDeleteTask, handleStatus }: Props) => {
  return (
    // <div className="megaWrapper">
    //   {todos.length ? (
    <div className="wrapper">
      {todos.map((todo) => (
        <div key={todo.id} className="todoTaskContainer">
          <label htmlFor={todo.id}>
            <input
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
};

export default Complete;
