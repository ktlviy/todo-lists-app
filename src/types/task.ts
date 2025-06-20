export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  listId: string;
  createdBy: string;
  updatedAt?: string;
}
