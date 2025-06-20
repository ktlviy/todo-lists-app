import { User } from "firebase/auth";
import { Task } from "./task";

export type Role = "admin" | "viewer";

export interface UserProps {
  name: string;
  email: string;
  role: Role;
  lists: Task[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}
