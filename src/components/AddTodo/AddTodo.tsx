import { useState, FormEvent, ChangeEvent } from "react";
import { ITask, TodoStatuses } from "../../lib/Interfaces";
import { nanoid } from "nanoid";
import { createTodo } from "../../lib/DatabaseService";

import "./AddTodo.css";

interface Props {
  handleAdd: (todo: ITask, status: TodoStatuses) => void;
}

function AddTodo({ handleAdd }: Props) {
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      id: nanoid(),
      taskName,
      deadline: deadline,
      status: TodoStatuses.incomplete,
    };
    createTodo(todo)
      .then(() => {
        setTaskName("");
        setDeadline(0);
      })
      .then(() => {
        handleAdd(todo, TodoStatuses.incomplete);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "taskName") {
      setTaskName(e.target.value);
    }
  };

  return (
    <form className="headerContainer" onSubmit={handleSubmit}>
      <div className="inputHeader">
        <input
          className="taskInput"
          type="text"
          placeholder="Add a task..."
          value={taskName}
          name="taskName"
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <button type="submit" className="addBtn">
        {/* &#9758; */}
        &#43;
      </button>
    </form>
  );
}

export default AddTodo;
