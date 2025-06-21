import { useState } from "react";
import TaskList from "./TaskList";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import AddCollaboratorForm from "./modals/AddCollabaratorModal";
import EditTitleModal from "./modals/EditTitleModal";
import { deleteList } from "@/services/list";
import { useListRole } from "@/context/IsAdminContext";
import { ListCardProps } from "@/types";

const ListCard = (list: ListCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collabDialogOpen, setCollabDialogOpen] = useState(false);
  const [editTitleDialogOpen, setEditTitleDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTitle, setCurrentTitle] = useState(list.title);
  const { isAdmin } = useListRole();

  const handleDeleteList = async () => {
    setIsVisible(false);
    if (list.onOptimisticDelete) {
      list.onOptimisticDelete(list.id);
    }
    try {
      await deleteList(list.id);
    } catch (e) {
      setIsVisible(true);
    }
    setDeleteDialogOpen(false);
  };

  const handleTitleUpdate = (newTitle: string) => {
    setCurrentTitle(newTitle);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white/80 border border-[#F79489] rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4 font-poppins w-full min-h-[300px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-[#F9F1F0] scrollbar-thumb-[#F79489] scrollbar-thumb-rounded scrollbar-thumb-hover-[#F8AFA6] backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-[#F79489] text-shadow">
          {currentTitle}
        </h3>
        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#F79489] hover:bg-[#fff5f5] hover:text-[#ff6666] active:scale-95"
                type="button"
                aria-label="List options"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/90 border-[#ff9999] rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
              <DropdownMenuItem
                onClick={() => setEditTitleDialogOpen(true)}
                className="text-[#F79489] hover:bg-[#fff5f5] hover:text-[#ff6666] focus:bg-[#fff5f5]"
              >
                Edit Title
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCollabDialogOpen(true)}
                className="text-[#F79489] hover:bg-[#fff5f5] hover:text-[#ff6666] focus:bg-[#fff5f5]"
              >
                Add Collaborator
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:bg-[#fff5f5] hover:text-red-700 focus:bg-[#fff5f5]"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <TaskList {...list} />
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)] font-poppins">
          <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
            Delete List
          </DialogTitle>
          <DialogDescription className="text-[#F79489] text-shadow">
            Are you sure you want to delete this list? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="mt-2 flex gap-2 sm:flex-row flex-col">
            <Button
              variant="secondary"
              className="bg-[#f0f0f0] text-[#333] rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff5555] hover:text-white active:scale-95"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-[#ff9999] text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff6666] hover:text-white active:scale-95"
              onClick={handleDeleteList}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={collabDialogOpen} onOpenChange={setCollabDialogOpen}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
          <DialogTitle className="text-xl font-medium text-[#F79489] text-shadow">
            Add Collaborator
          </DialogTitle>
          <AddCollaboratorForm {...list} />
        </DialogContent>
      </Dialog>
      <Dialog open={editTitleDialogOpen} onOpenChange={setEditTitleDialogOpen}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
          <DialogTitle className="text-xl font-medium text-[#F79489] text-shadow">
            Edit List Title
          </DialogTitle>
          <EditTitleModal
            listId={list.id}
            currentTitle={currentTitle}
            onTitleUpdate={handleTitleUpdate}
            onClose={() => setEditTitleDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListCard;
