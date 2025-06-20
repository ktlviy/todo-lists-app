import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CreateListFormProps } from "@/types";

const CreateListForm = ({ onAddList }: CreateListFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddList(title.trim());
    setTitle("");
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
      <Button
        type="submit"
        className="mt-2 bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] active:scale-98"
      >
        Create List
      </Button>
    </form>
  );
};

export default CreateListForm;
