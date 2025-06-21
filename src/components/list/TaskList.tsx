import { useEffect, useState } from "react";
import TaskItem from "../tasks/TaskItem";
import { Task } from "@/types/task";
import { fetchTasks, addTask, deleteTask } from "@/services/task";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { useListRole } from "@/context/IsAdminContext";
import { TaskListProps } from "@/types";
import AddTaskModal from "../tasks/modals/AddTaskModal";

const TaskList = ({ id, onEmptyState }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useListRole();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const taskList = await fetchTasks(id);
        setTasks(taskList);
        if (onEmptyState) {
          onEmptyState(taskList.length === 0);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, onEmptyState]);

  const handleAddTask = async (
    title: string,
    description: string,
    userId: string
  ) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTask: Task = {
      id: tempId,
      title,
      description,
      completed: false,
      createdBy: userId,
      listId: id,
    };
    setTasks((prev) => [optimisticTask, ...prev]);
    setShowModal(false);
    try {
      await addTask(id, title, description, userId);
      const updated = await fetchTasks(id);
      setTasks(updated);
      if (onEmptyState) {
        onEmptyState(updated.length === 0);
      }
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      if (onEmptyState) {
        onEmptyState(tasks.length - 1 === 0);
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (onEmptyState) {
      onEmptyState(tasks.length - 1 === 0);
    }
    try {
      await deleteTask(taskId);
      const updated = await fetchTasks(id);
      setTasks(updated);
      if (onEmptyState) {
        onEmptyState(updated.length === 0);
      }
    } catch {
      setTasks(prevTasks);
      if (onEmptyState) {
        onEmptyState(prevTasks.length === 0);
      }
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-[#F79489] text-shadow">
          Tasks
        </h4>
        {isAdmin && (
          <Button
            variant="default"
            size="sm"
            className="bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] hover:text-white active:scale-98"
            onClick={() => setShowModal(true)}
            aria-label="Add new task"
          >
            Add Task
          </Button>
        )}
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)] font-poppins">
          <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
            Add Task
          </DialogTitle>
          <AddTaskModal id={id} disabled={!isAdmin} onAddTask={handleAddTask} />
          <DialogFooter className="mt-2 flex gap-2 sm:flex-row flex-col"></DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-2 mt-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-[#F9F1F0] scrollbar-thumb-[#F79489] scrollbar-thumb-rounded scrollbar-thumb-hover-[#F8AFA6]">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <span className="text-[#F79489] text-shadow text-lg font-medium">
              Loading tasks...
            </span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex justify-center items-center h-[200px]">
            <span className="text-[#F79489] text-shadow text-lg font-medium">
              No tasks yet.
            </span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              list={id}
              isAdmin={isAdmin}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
