import { List } from "./list";

export interface AlertProps {
  open: boolean;
  message: string;
}

export interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  initialDescription?: string;
  onSave: (title: string, description: string) => void;
}

export interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  list: string;
  onDelete: (id: string) => void;
}

export interface CreateListFormProps {
  onAddList: (title: string) => void;
}

export interface ListCardProps extends List {
  onOptimisticDelete: (id: string) => void;
}

export interface AddTaskFormProps {
  id: string;
  disabled?: boolean;
  onAddTask?: (title: string, description: string, userId: string) => void;
}

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isPublic?: boolean;
}

export interface TaskListProps extends List {
  onEmptyState?: (empty: boolean) => void;
}

export interface EditTitleModalProps {
  listId: string;
  currentTitle: string;
  onTitleUpdate: (newTitle: string) => void;
  onClose: () => void;
}
