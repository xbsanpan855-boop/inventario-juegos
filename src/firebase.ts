// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Pega aquí TU configuración
const firebaseConfig = {
  apiKey: "AIzaSyALvtNzwUL-RtYNXfVrJmkX9TvAm0di8LY",
  authDomain: "inventario-juegos-blas.firebaseapp.com",
  projectId: "inventario-juegos-blas",
  storageBucket: "inventario-juegos-blas.firebasestorage.app",
  messagingSenderId: "569532420634",
  appId: "1:569532420634:web:3c721b1db6e276a04937a3",
  measurementId: "G-R0XGRWQJ13"
};

// Inicializamos la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la referencia a la base de datos (Firestore)
export const db = getFirestore(app);