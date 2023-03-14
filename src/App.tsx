import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./App.css";
import { ITask, TodoStatuses } from "./lib/Interfaces";
import { nanoid } from "nanoid";
import {
  createTodo,
  deleteTodo,
  fetchIncomplete,
  fetchComplete,
  updateTodoStatus,
} from "./lib/Funtions";
import Incomplete from "./components/Incomplete/Incomplete";
import Complete from "./components/Complete/Complete";
import AddTodo from "./components/AddTodo/AddTodo";

import EditModal from "./components/EditModal/EditModal";

function App() {
  // const [task, setTask] = useState<string>("");
  // const [deadline, setDeadline] = useState<number>(0);
  // const [todoList, setTodoList] = useState<ITask[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<ITask[]>([]);
  const [completeTodos, setCompleteTodos] = useState<ITask[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

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

    // allTodos().then((res) => {
    //   console.log("side effect init!");
    //   setTodoList(res);
    // });
  }, []);

  // use prev value when setting the todo list
  const handleAdd = (todo: ITask, status: TodoStatuses) => {
    status === TodoStatuses.incomplete
      ? setIncompleteTodos((prev) => [todo, ...prev])
      : setCompleteTodos((prev) => [todo, ...prev]);
  };

  const removeIncompleteTodo = (id: string) => {
    setIncompleteTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);
  };

  const removeCompleteTodo = (id: string) => {
    setCompleteTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);
  };

  const handleStatus = (todo: ITask) => {
    const { id, status } = todo;

    if (status === TodoStatuses.incomplete) {
      console.log(status, id);

      updateTodoStatus({ id, status: TodoStatuses.complete }).then(() => {
        removeIncompleteTodo(id);
        setCompleteTodos((prev) => [todo, ...prev]);
      });
    } else {
      console.log(status, id);

      updateTodoStatus({ id, status: TodoStatuses.incomplete }).then(() => {
        removeCompleteTodo(id);
        setIncompleteTodos((prev) => [todo, ...prev]);
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    console.log(id);
    deleteTodo(id).then(() => {
      setIncompleteTodos((prev) => [...prev.filter((todo) => todo.id !== id)]);
    });
  };

  const handleDeleteAllTasks = () => {
    console.log("one ring to rule them all!");
  };

  // const showEditModal = () => {
  //   setShowModal(true);
  //   console.log("i'm gon surface right there");
  // };
  // const hideEditModal = () => {
  //   setShowModal(false);
  //   console.log("oops, i'm gone");
  // };

  const toggleEditModal = () => {
    setShowModal(!showModal);
  };

  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const editTodo = (id: string, newTodoName: string) => {
    const editedTodoList = incompleteTodos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, name: newTodoName };
      }
      return todo;
    });
    setIncompleteTodos(editedTodoList);
    console.log(id, newTodoName);
  };

  return (
    <div className="App">
      <h1>theTodoRvstd</h1>
      <AddTodo handleAdd={handleAdd} />

      <div className="tasksDisplay">
        <div className="incompleteTasks">
          <div className="deleteOrEdit">
            <h3>I plan to</h3>

            {/* <button className="editModeButton" onClick={toggleEditModal}>
              &#9997;
            </button> */}

            <button
              className="deleteAll"
              onClick={() => handleDeleteAllTasks()}
            >
              &#10007;
            </button>
          </div>
          <Incomplete
            todos={incompleteTodos}
            handleDeleteTask={handleDeleteTask}
            handleStatus={handleStatus}
            toggleEditModal={toggleEditModal}
          />
        </div>

        <div className="completeTasks">
          <div className="uncheck">
            <h3>I'm done with</h3>
            <button className="uncheckAll">&#10004;</button>
          </div>

          <Complete
            todos={completeTodos}
            handleDeleteTask={handleDeleteTask}
            handleStatus={handleStatus}
          />
        </div>
        {/* <Modal isOpen={showModal}> */}
        {showModal && (
          <EditModal toggleEditModal={toggleEditModal} editTodo={editTodo} />
        )}
        {/* </Modal> */}
      </div>
    </div>
  );
}

export default App;
