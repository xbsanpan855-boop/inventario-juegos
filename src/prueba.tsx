import { useState } from "react";
import type { Equipment } from "./types";
import { EquipmentList } from "./components/EquipmentList";
import { EquipmentForm } from "./components/GameForm";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // 1. Convertimos los datos en Estado. Inicializamos con mockData.
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Referencia a la colección 'equipos' en Firebase
        const querySnapshot = await getDocs(collection(db, "equipos"));

        // Transformamos los datos (Firebase devuelve docs, nosotros queremos objetos)
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // El ID viene del documento
          ...doc.data(), // El resto de datos (nombre, tipo...)
        })) as Equipment[];

        setEquipment(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false); // Quitamos el loading pase lo que pase
      }
    };

    fetchData();
  }, []); // Array vacío = Solo se ejecuta una vez al inicio

  // 2. Función para añadir (inmutabilidad: creamos un array nuevo)
  const handleAddEquipment = async (newItem: Equipment) => {
    try {
      // 1. Guardamos en Firebase (sin ID, Firebase lo crea)
      // Usamos destructuración para quitar el ID temporal que generaba el formulario
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...dataToSave } = newItem;

      const docRef = await addDoc(collection(db, "equipos"), dataToSave);

      // 2. Actualizamos el estado local con el ID REAL que nos dio Firebase
      // Esto evita tener que volver a pedir todos los datos al servidor
      const savedItem = { ...newItem, id: docRef.id };
      setEquipment([...equipment, savedItem]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error al guardar");
    }
  };

  const handleDelete = async (id: string) => {
    // Confirmación básica de navegador
    if (!confirm("¿Estás seguro de borrar este equipo?")) return;

    try {
      // 1. Borramos en Firebase
      // 'doc' crea una referencia: base de datos, colección, ID del documento
      await deleteDoc(doc(db, "equipos", id));

      // 2. Actualizamos estado local (filtramos para quitar el borrado)
      const newList = equipment.filter((item) => item.id !== id);
      setEquipment(newList);
    } catch (error) {
      console.error("Error borrando:", error);
      alert("Error al borrar");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>TechInventory</h1>

      <EquipmentForm onAdd={handleAddEquipment} />

      {/* Renderizado condicional del estado de carga */}
      {isLoading ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Cargando inventario...
        </p>
      ) : (
        <EquipmentList items={equipment} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
