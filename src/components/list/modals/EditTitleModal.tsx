import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { editListTitle } from "@/services/list";
import { EditTitleModalProps } from "@/types";

const EditTitleModal = ({
  listId,
  currentTitle,
  onTitleUpdate,
  onClose,
}: EditTitleModalProps) => {
  const [title, setTitle] = useState(currentTitle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim() === currentTitle) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      await editListTitle(listId, title.trim());
      onTitleUpdate(title.trim());
      onClose();
    } catch (error) {
      console.error("Failed to update title:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-2 md:p-4 font-poppins"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List title"
        required
        className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic mb-2"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="flex-1 bg-[#f0f0f0] text-[#333] rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#e0e0e0] active:scale-98"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !title.trim() || title.trim() === currentTitle}
          className="flex-1 bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update Title"}
        </Button>
      </div>
    </form>
  );
};

export default EditTitleModal;
