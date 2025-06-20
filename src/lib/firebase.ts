import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqVGh8UVTF34w8Z3q5iNS8PGz3LnMOMDw",
  authDomain: "todo-task-list-easy.firebaseapp.com",
  projectId: "todo-task-list-easy",
  storageBucket: "todo-task-list-easy.firebasestorage.app",
  messagingSenderId: "748928059630",
  appId: "1:748928059630:web:e675082d9c831567334bff",
  measurementId: "G-NFRPN8R9R5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
