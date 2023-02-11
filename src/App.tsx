import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./App.css";
import { ITask, TodoStatuses } from "./lib/Interfaces";
import { nanoid } from "nanoid";
import allTodos, {
  createTodo,
  deleteTodo,
  fetchIncomplete,
  fetchComplete,
  updateTodoStatus,
} from "./lib/Funtions";
import Incomplete from "./components/Incomplete/Incomplete";
import Complete from "./components/Complete/Complete";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<ITask[]>([]);
  const [completeTodos, setCompleteTodos] = useState<ITask[]>([]);

  // const alternativeChange = (text: string | number): void => {
  //   if (typeof text === "string") {
  //     setTask(text);
  //   } else {
  //     setDeadline(text);
  //   }
  // };

  useEffect(() => {
    fetchIncomplete().then((res) => setIncompleteTodos(res));
    fetchComplete().then((res) => setCompleteTodos(res));

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
    const newTask = {
      taskName: task,
      deadline: deadline,
      id: nanoid(),
      status: TodoStatuses.incomplete,
    };
    createTodo(newTask).then(() => {
      setTask("");
      setDeadline(0);
    });
    setIncompleteTodos((prev) => [...prev, newTask]);
    console.log(newTask);
  };

  const handleStatus = (task: ITask) => {
    const { id, status } = task;
    if (status === TodoStatuses.incomplete) {
      updateTodoStatus(id, TodoStatuses.complete).then(() => {
        setIncompleteTodos((prev) => [task, ...prev]);
      });
    } else {
      updateTodoStatus(id, TodoStatuses.incomplete).then(() => {
        setCompleteTodos((prev) => [task, ...prev]);
      });
    }
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

  const handleDeleteTask = (id: string) => {
    console.log(id);
    deleteTodo(id).then(() => {
      setTodoList((prevTodoList) => [
        ...prevTodoList.filter((todo) => todo.id !== id),
      ]);
    });
  };

  const handleDeleteAllTasks = () => {
    console.log("one ring to rule them all!");
  };

  return (
    <div className="App">
      <h1>theTodoRvstd</h1>
      <form className="headerContainer" onSubmit={handleAdd}>
        <div className="inputHeader">
          <input
            className="taskInput"
            type="text"
            placeholder="Add a task..."
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
        <div className="incompleteTasks">
          <div className="delete">
            <h3>I plan to</h3>
            <button
              className="deleteAll"
              onClick={() => handleDeleteAllTasks()}
            >
              &#10006;
            </button>
          </div>
          {incompleteTodos.map((task: ITask) => {
            return (
              <Incomplete
                task={task}
                key={task.id}
                handleDeleteTask={handleDeleteTask}
                handleStatus={handleStatus}
              />
            );
          })}
        </div>
        <div className="completeTasks">
          <div className="uncheck">
            <h3>I'm done with</h3>
            <button className="uncheckAll">&#10004;</button>
          </div>
          {completeTodos.map((task: ITask) => {
            return (
              <Complete
                task={task}
                key={task.id}
                handleDeleteTask={handleDeleteTask}
                handleStatus={handleStatus}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
