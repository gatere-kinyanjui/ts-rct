import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./App.css";
import { ITask } from "./lib/Interfaces";
import { nanoid } from "nanoid";
import TodoTask from "./components/TodoTask/TodoTask";
import allTodos, { createTodo } from "./lib/Funtions";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  // const alternativeChange = (text: string | number): void => {
  //   if (typeof text === "string") {
  //     setTask(text);
  //   } else {
  //     setDeadline(text);
  //   }
  // };

  useEffect(() => {
    allTodos().then((res) => {
      console.log("side effect init!");
      setTodoList(res);
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  // use prev value when setting the todo list
  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = { taskName: task, deadline: deadline, id: nanoid() };
    createTodo(newTask).then(() => {
      setTask("");
      setDeadline(0);
    });
    setTodoList((prev) => [...prev, newTask]);
    console.log(newTask);
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

  //   console.log(e);
  // };

  //complete task then filter
  // const completeTask = (taskNameToDelete: string) => {
  //   setTodoList(
  //     todoList.filter((task) => {
  //       return task.taskName != taskNameToDelete;
  //     })
  //   );
  // };

  return (
    <div className="App">
      <h1>theTodoRvstd</h1>
      <form className="headerContainer" onSubmit={handleAdd}>
        <div className="inputHeader">
          <input
            type="text"
            placeholder="Add task..."
            value={task}
            name="task"
            // required
            onChange={handleChange}
            // onChange={(e) => alternativeChange(e.target.value)}
          />
          {/* <input
            type="number"
            placeholder="Days..."
            value={deadline}
            name="deadline"
            // required
            onChange={handleChange}
            // onChange={(e) => {
            //   const number = Number(e.target.value);
            //   !isNaN(number) && alternativeChange(number);
            // }}
          /> */}
        </div>
        <button type="submit" className="addBtn">
          &#9758;
        </button>
      </form>
      <div className="tasksDisplay">
        <h2>Tasks go down here...</h2>
        {todoList.map((task: ITask) => {
          return <TodoTask task={task} key={task.id} />;
        })}
      </div>
    </div>
  );
};

export default App;
