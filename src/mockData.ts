import type { Game } from "./types";

export const mockData: Game[] = [
    {
        id: "1",
        titulo: "ARK",
        horasJugadas: 200,
        plataforma: 'PC',
        genero: "Supervivencia",
        estado: "completado"
    },
    {
        id: "2",
        titulo: "Fortnite",
        horasJugadas: 50,
        plataforma: 'Playstation',
        genero: "FPS",
        estado: "completado"
    },
    {
        id: "3",
        titulo: "Red dead redemption",
        horasJugadas: 1000,
        plataforma: 'PC',
        genero: "Aventura",
        estado: "pendiente"
    },
]