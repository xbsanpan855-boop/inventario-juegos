export interface Game {
    id: string;
    titulo: string;
    horasJugadas: number;
    plataforma: 'PC' | 'Playstation' | 'Xbox' | 'Switch' | 'Nintendo 3DS' | 'Otro';
    genero: string;
    estado: 'pendiente' | 'jugando' | 'completado';
}