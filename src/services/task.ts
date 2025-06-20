import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task } from "@/types/task";

export const fetchTasks = async (listId: string): Promise<Task[]> => {
  const tasksRef = collection(db, "tasks");
  const q = query(tasksRef, where("listId", "==", listId));
  const snapshot = await getDocs(q);

  const tasks = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      listId: data.listId,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
    } satisfies Task;
  });

  return tasks;
};

export const addTask = async (
  listId: string,
  title: string,
  description: string,
  createdBy: string
) => {
  const taskRef = await addDoc(collection(db, "tasks"), {
    listId,
    title,
    description,
    completed: false,
    createdBy,
    updatedAt: new Date().toISOString(),
  });

  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    taskIds: arrayUnion(taskRef.id),
  });
};

export const editTask = async (
  taskId: string,
  updates: { title?: string; description?: string }
) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  const taskSnap = await getDocs(
    query(collection(db, "tasks"), where("__name__", "==", taskId))
  );
  if (!taskSnap.empty) {
    const taskData = taskSnap.docs[0].data();
    const listId = taskData.listId;
    const listRef = doc(db, "lists", listId);
    await updateDoc(listRef, {
      taskIds: arrayRemove(taskId),
    });
  }

  await deleteDoc(taskRef);
};

export const toggleComplete = async (taskId: string, completed: boolean) => {
  await updateDoc(doc(db, "tasks", taskId), {
    completed,
    updatedAt: new Date().toISOString(),
  });
};
