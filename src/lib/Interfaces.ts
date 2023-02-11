export interface ITask {
  taskName: string;
  deadline: number;
  id: string;
  status: TodoStatuses;
}

export enum TodoStatuses {
  "incomplete" = "incomplete",
  "complete" = "complete",
}
