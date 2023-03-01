import { ITask, TodoStatuses } from "./Interfaces";

const url = "http://localhost:9001";

//adding a todo to db
export function createTodo(todo: ITask) {
  return fetch(`${url}/todos`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

//fetch all todos
// export default async function allTodos() {
//   const response = await fetch(`${url}/todos`);
//   const todos = (await response.json()) as ITask[];
//   return todos;
// }

//fetch incomplete todos
export async function fetchIncomplete() {
  const response = await fetch(
    `${url}/todos?status=${TodoStatuses.incomplete}`
  );
  const todos = (await response.json()) as ITask[];
  return todos;
}

//fetch complete todos
export async function fetchComplete() {
  const response = await fetch(`${url}/todos?status=${TodoStatuses.complete}`);
  const todos = (await response.json()) as ITask[];
  return todos;
}

// deleting a todo
export async function deleteTodo(id: string) {
  return fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });
}

//updating todo status
export async function updateTodoStatus({
  id,
  status,
}: {
  id: string;
  status: TodoStatuses;
}): Promise<Response> {
  return fetch(`${url}/todos/${id}`, {
    method: "PATCH",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
