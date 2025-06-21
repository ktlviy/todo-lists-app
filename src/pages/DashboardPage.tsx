import { useEffect, useState } from "react";
import CreateListModal from "@/components/list/modals/CreateListModal";
import { fetchLists, createList, deleteList } from "@/services/list";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import ListCard from "@/components/list/ListCard";
import { IsAdminRoleProvider } from "@/context/IsAdminContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const fetched = await fetchLists(user.uid);
      setLists(fetched);
      setLoading(false);
    })();
  }, [user]);

  const handleAddList = async (title: string) => {
    if (!user) return;
    const tempId = `temp-${Date.now()}`;
    const optimisticList = {
      id: tempId,
      title,
      createdBy: user.uid,
    };
    setLists((prev) => [optimisticList, ...prev]);
    try {
      await createList(title, user.uid, user.email || "");
      const fetched = await fetchLists(user.uid);
      setLists(fetched);
    } catch (e) {
      setLists((prev) => prev.filter((l) => l.id !== tempId));
    }
    setShowCreate(false);
  };

  const handleOptimisticDelete = (id: string) => {
    const prevLists = lists;
    setLists((prev) => prev.filter((l) => l.id !== id));
    deleteList(id).catch(() => setLists(prevLists));
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  return (
    <div className=" mx-auto py-10 px-4 sm:px-6 lg:px-8 font-poppins bg-[linear-gradient(135deg,#ffe6e6_0%,#e6e6ff_100%)] min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-[#F79489] text-shadow text-center md:text-left">
          Welcome
          {user?.displayName
            ? `, ${user.displayName}`
            : user?.email
              ? `, ${user.email}`
              : ""}
          !
        </h2>
      </div>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-[#F79489] text-shadow text-center sm:text-left">
            Your Lists
          </h1>
          <Button
            variant="default"
            size="icon"
            className="bg-[#ff9999] text-white rounded-lg hover:bg-[#ff6666] hover:text-white active:scale-98 border-[#ff9999]"
            onClick={() => setShowCreate(true)}
            title="Create new list"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <Button
          variant="default"
          className="bg-[#ff9999] text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff6666] hover:text-white active:scale-95"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
          <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
            Confirm Logout
          </DialogTitle>
          <div className="text-[#F79489] text-shadow">
            Are you sure you want to logout?
          </div>
          <DialogFooter className="mt-2 flex gap-2 sm:flex-row flex-col">
            <Button
              variant="secondary"
              className="bg-[#f0f0f0] text-[#333] rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff5555] hover:text-white active:scale-95"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-[#ff9999] text-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-[#ff6666] hover:text-white active:scale-95"
              onClick={confirmLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-[linear-gradient(135deg,rgba(255,230,230,0.9),rgba(230,230,255,0.9))] border-[#ff9999] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.05)]">
          <DialogTitle className="text-lg font-medium text-[#F79489] text-shadow">
            Create New List
          </DialogTitle>
          <CreateListModal onAddList={handleAddList} />
          <DialogFooter className="mt-2 flex gap-2 sm:flex-row flex-col"></DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <span className="text-[#F79489] text-shadow text-lg font-medium">
            Loading your lists...
          </span>
        </div>
      ) : lists.length === 0 ? (
        <div className="flex justify-center items-center py-16">
          <span className="text-[#F79489] text-shadow text-lg font-medium">
            No lists yet. Create one!
          </span>
        </div>
      ) : (
        <div className="container max-w-screen w-full overflow-y-auto scrollbar-thin scrollbar-track-[#F9F1F0] scrollbar-thumb-[#F79489] scrollbar-thumb-rounded scrollbar-thumb-hover-[#F8AFA6]">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 min-w-[]">
            {lists.map((list) => (
              <IsAdminRoleProvider listId={list.id} key={list.id}>
                <ListCard
                  {...list}
                  onOptimisticDelete={handleOptimisticDelete}
                />
              </IsAdminRoleProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
