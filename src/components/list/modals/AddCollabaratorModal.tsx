import { useState } from "react";
import { addCollaborator } from "@/services/list";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../../ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Role, AlertProps, List } from "@/types/";

const AddCollaboratorModal = ({ id }: List) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("viewer");
  const [alert, setAlert] = useState<AlertProps>({
    open: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCollaborator(id, email, role);
      setAlert({ open: true, message: "Collaborator added" });
      setEmail("");
    } catch (err) {
      setAlert({
        open: true,
        message: err instanceof Error ? err.message : "Error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-2 md:p-4 font-poppins"
      >
        <Input
          type="email"
          placeholder="Collaborator email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] text-base focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] placeholder:text-[#ff9999]/70 placeholder:italic mb-2"
        />
        <Select value={role} onValueChange={(value) => setRole(value as Role)}>
          <SelectTrigger className="bg-white/90 border-[#ff9999] rounded-lg px-3 py-2 text-[#F79489] focus:outline-none focus:border-[#ff6666] focus:shadow-[0_0_5px_rgba(255,102,102,0.3)] mb-2">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="bg-white/90 border-[#ff9999] rounded-lg">
            <SelectItem
              value="admin"
              className="text-[#F79489] hover:bg-[#fff5f5]"
            >
              Admin
            </SelectItem>
            <SelectItem
              value="viewer"
              className="text-[#F79489] hover:bg-[#fff5f5]"
            >
              Viewer
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="mt-2 bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] active:scale-98"
        >
          Add Collaborator
        </Button>
      </form>
      <AlertDialog
        open={alert.open}
        onOpenChange={(open) => setAlert((a) => ({ ...a, open }))}
      >
        <AlertDialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
          <AlertDialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
            Info
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#F79489] text-shadow">
            {alert.message}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button
              onClick={() => setAlert((a) => ({ ...a, open: false }))}
              className="bg-[#ff9999] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#ff6666] active:scale-98"
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddCollaboratorModal;
