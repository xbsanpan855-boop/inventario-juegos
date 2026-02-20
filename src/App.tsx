import { GameList } from "./components/GameList";
import { useState } from "react";
import { GameForm } from "./components/GameForm";
import type { Game } from "./types";
import { useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [game, setGame] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "juegos"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Game[];

        setGame(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddGame = async (newItem: Game) => {
    try {
      //En lugar de extraer el id, creo el objeto para guardar directamente
      const dataToSave = {
        titulo: newItem.titulo,
        horasJugadas: newItem.horasJugadas,
        plataforma: newItem.plataforma,
        genero: newItem.genero,
        estado: newItem.estado
      };

      const docRef = await addDoc(collection(db, "juegos"), dataToSave);

      const savedItem = { ...newItem, id: docRef.id };
      setGame([...game, savedItem]);
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar");
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("¿Seguro que quieres borrar este juego?")) return;

    try {
      await deleteDoc(doc(db, 'juegos', id));

      const newList = game.filter((item) => item.id !== id);
      setGame(newList);
    } catch (error) {
      console.error("Error borrando:", error);
      alert("Error al borrar");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        padding: "40px 20px",
        color: "#f8fafc",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(to right, #60a5fa, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Mi inventario de juegos
          </h1>
          <p style={{ color: "#64748b" }}>
            Gestión profesional de biblioteca personal
          </p>
        </header>
        <GameForm onAdd={handleAddGame} />
        {isLoading ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Cargando juegos...
          </p>
        ) : (
          <GameList items={game} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
