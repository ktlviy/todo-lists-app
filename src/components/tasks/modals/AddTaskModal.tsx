import { useState } from "react";
import { addTask } from "@/services/task";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { AddTaskFormProps } from "@/types";

const AddTaskModal = ({
  id,
  disabled = false,
  onAddTask,
}: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || disabled) return;
    if (onAddTask) {
      await onAddTask(title, description, user.uid);
    } else {
      await addTask(id, title, description, user.uid);
    }
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2 md:p-4">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mb-2"
        disabled={disabled}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2"
        disabled={disabled}
      />
      <Button type="submit" className="mt-2" disabled={disabled}>
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskModal;
