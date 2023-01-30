import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./lib/Interfaces";
import { nanoid } from "nanoid";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  function alternativeChange(text: string | number) {
    if (typeof text === "string") {
      setTask(text);
    } else {
      setDeadline(text);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
    // console.log(e.target.value);
  };

  // use prev value when setting the todo list
  const handleAdd = (): void => {
    const newTask = { task: task, deadline: deadline, id: nanoid() };
    setTodoList((prev) => [...prev, newTask]);
    console.log(newTask);
    setTask("");
    setDeadline(0);
  };

  return (
    <div className="App">
      <h1>theTodoRvstd</h1>
      <div className="headerContainer">
        <div className="inputHeader">
          <input
            type="text"
            placeholder="Add task..."
            value={task}
            name="task"
            // required
            // onChange={handleChange}
            onChange={(e) => alternativeChange(e.target.value)}
          />
          <input
            type="number"
            placeholder="Days..."
            value={deadline}
            name="deadline"
            // required
            // onChange={handleChange}
            onChange={(e) => {
              const number = Number(e.target.value);
              !isNaN(number) && alternativeChange(number);
            }}
          />
        </div>
        <button type="submit" onClick={handleAdd}>
          &#9758;
        </button>
      </div>
      <div className="tasksDisplay">
        <h2>Tasks go down here...</h2>
      </div>
    </div>
  );
};

export default App;
