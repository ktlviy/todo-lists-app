import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditTaskModalProps } from "@/types/components";

const EditTaskModal = ({
  open,
  onOpenChange,
  initialTitle,
  initialDescription = "",
  onSave,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, description);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)] font-poppins">
        <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
          Edit Task
        </DialogTitle>
        <DialogDescription className="text-[#F79489] text-shadow">
          Update the title and description of your task.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic mb-2"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic mb-2"
          />
          <DialogFooter className="mt-2 flex gap-2 sm:flex-row flex-col">
            <Button
              type="button"
              variant="secondary"
              className="bg-[#f0f0f0] text-[#333] rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff5555] hover:text-white active:scale-95"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-[#ff9999] text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff6666] hover:text-white active:scale-98"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
