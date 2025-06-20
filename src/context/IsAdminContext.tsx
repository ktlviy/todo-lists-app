import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAdminOfList } from "@/services/list";
import { useAuth } from "@/context/AuthContext";
import { ListRoleContextType } from "@/types";

const IsAdminContext = createContext<ListRoleContextType>({
  isAdmin: false,
  loading: true,
});

export function IsAdminRoleProvider({
  listId,
  children,
}: {
  listId: string;
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    if (user && listId) {
      isAdminOfList(listId, user.uid).then((result) => {
        if (!ignore) setIsAdmin(result);
        setLoading(false);
      });
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
    return () => {
      ignore = true;
    };
  }, [user, listId]);

  return (
    <IsAdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </IsAdminContext.Provider>
  );
}

export function useListRole() {
  return useContext(IsAdminContext);
}
