import { db } from "@/lib/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const fetchLists = async (userId: string) => {
  const userSnap = await getDocs(
    query(collection(db, "users"), where("uid", "==", userId))
  );
  if (userSnap.empty) return [];

  const userData = userSnap.docs[0].data();
  const listIds: string[] = userData.listIds || [];

  if (listIds.length === 0) return [];

  const listsRef = collection(db, "lists");
  const q = query(listsRef, where("__name__", "in", listIds));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createList = async (
  title: string,
  userId: string,
  userEmail: string
) => {
  const newList = await addDoc(collection(db, "lists"), {
    title,
    createdBy: userId,
    collaborators: [{ uid: userId, email: userEmail, role: "admin" }],
    createdAt: new Date().toISOString(),
  });

  await updateDoc(doc(db, "users", userId), {
    listIds: arrayUnion(newList.id),
  });

  return newList.id;
};

export const addCollaborator = async (
  listId: string,
  email: string,
  role: "viewer" | "admin"
) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("User not found");

  const userDoc = snapshot.docs[0];
  const { uid } = userDoc.data();

  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    collaborators: arrayUnion({ uid, email, role }),
  });

  await updateDoc(doc(db, "users", uid), {
    listIds: arrayUnion(listId),
  });
};

export const deleteList = async (listId: string) => {
  await deleteDoc(doc(db, "lists", listId));

  const usersRef = collection(db, "users");
  const usersSnap = await getDocs(usersRef);

  for (const userDoc of usersSnap.docs) {
    const userData = userDoc.data();
    if (Array.isArray(userData.listIds) && userData.listIds.includes(listId)) {
      await updateDoc(userDoc.ref, {
        listIds: arrayRemove(listId),
      });
    }
  }
};

export async function isAdminOfList(
  listId: string,
  userId: string
): Promise<boolean> {
  if (!listId || !userId) return false;
  const listRef = doc(db, "lists", listId);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) return false;
  const data = listSnap.data();
  return (
    Array.isArray(data.collaborators) &&
    data.collaborators.some(
      (collab: any) => collab.uid === userId && collab.role === "admin"
    )
  );
}
