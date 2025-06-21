import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { toggleComplete, deleteTask, editTask } from "@/services/task";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import EditTaskModal from "./modals/EditTaskModal";
import { TaskItemProps } from "@/types/components";

const TaskItem = ({
  id,
  title,
  description,
  completed: completedProp,
  onDelete,
  isAdmin,
}: TaskItemProps & { isAdmin: boolean }) => {
  const [completed, setCompleted] = useState(completedProp);
  const [isVisible, setIsVisible] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description || "");

  const handleToggle = async () => {
    setCompleted((prev) => !prev);
    try {
      await toggleComplete(id, !completed);
    } catch (e) {
      setCompleted(completed);
    }
  };

  const handleDelete = async () => {
    setIsVisible(false);
    onDelete(id);
    try {
      await deleteTask(id);
    } catch (e) {
      setIsVisible(true);
    }
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleSaveEdit = async (newTitle: string, newDescription: string) => {
    setLocalTitle(newTitle);
    setLocalDescription(newDescription);
    setEditOpen(false);
    try {
      await editTask(id, { title: newTitle, description: newDescription });
    } catch (e) {
      console.log(e);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`relative w-full flex justify-between items-start bg-white/90 border border-[#ff9999] rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] cursor-pointer select-none transition-transform hover:-translate-y-0.5 ${
          completed ? "opacity-60 line-through text-gray-500" : ""
        }`}
        tabIndex={0}
        role="button"
        aria-pressed={completed}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggle();
        }}
      >
        <div className="flex flex-col space-y-1.5 max-w-[75%]">
          <div className="text-lg font-medium text-[#F79489] break-words">
            {localTitle}
          </div>
          {localDescription && (
            <div className="text-sm text-[#F79489] leading-snug break-words">
              {localDescription}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 mt-1 min-w-[110px]">
          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F79489] hover:bg-[#fff5f5]"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white/90 border-[#ff9999]"
              >
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="text-[#F79489] hover:bg-[#fff5f5]"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600 hover:bg-[#fff5f5]"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            size="sm"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              completed
                ? "bg-[#ff3333] text-white hover:bg-[#ff5555]"
                : "bg-[#f0f0f0] text-[#333] hover:bg-[#ff5555]"
            } active:scale-95`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {completed ? "Completed" : "Active"}
          </Button>
        </div>
      </div>
      <EditTaskModal
        open={editOpen}
        onOpenChange={setEditOpen}
        initialTitle={localTitle}
        initialDescription={localDescription}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TaskItem;
