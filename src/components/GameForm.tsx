import React, { useState } from "react";
import type { Game } from "../types";

interface GameFormProps {
    onAdd: (item: Game) => void;
}

export function GameForm({ onAdd }: GameFormProps) {
    const [titulo, setTitulo] = useState("");
    const [horasJugadas, setHorasJugadas] = useState<number>(0);
    const [plataforma, setPlataforma] = useState<Game['plataforma']>('Otro');
    const [genero, setGenero] = useState("");
    const [estado, setEstado] = useState<Game['estado']>('jugando');

    // Estilo base para todos los campos de entrada
    const inputStyle: React.CSSProperties = {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #334155',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        outline: 'none',
        fontSize: '14px',
        width: '100%'
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación básica: título y género son obligatorios
        if (!titulo || !genero) return;

        const newItem: Game = {
            id: crypto.randomUUID(),
            titulo,
            horasJugadas,
            plataforma,
            genero,
            estado
        };

        onAdd(newItem);
        
        // Resetear el formulario tras añadir
        setTitulo("");
        setGenero("");
        setHorasJugadas(0);
        setPlataforma('Otro');
        setEstado('jugando');
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            style={{ 
                backgroundColor: '#0f172a',
                padding: '25px', 
                borderRadius: '16px', 
                border: '1px solid #334155',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '40px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
        >
            <h2 style={{ gridColumn: '1 / -1', margin: '0 0 10px 0', color: '#60a5fa', fontSize: '1.4rem', textAlign: 'center' }}>
                ➕ AÑADIR A LA COLECCIÓN
            </h2>

            {/* Fila 1: Título (Ocupa todo el ancho) */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>Título del Videojuego</label>
                <input 
                    type="text" 
                    placeholder="Ej: The Legend of Zelda, Elden Ring..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    style={inputStyle}
                />
            </div>

            {/* Fila 2: Género e Horas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>Género</label>
                <input 
                    type="text" 
                    placeholder="Ej: RPG, Acción, Indie..."
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    style={inputStyle}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>Horas Jugadas</label>
                <div style={{ position: 'relative' }}>
                    <input 
                        type="number" 
                        placeholder="0"
                        value={horasJugadas}
                        onChange={(e) => setHorasJugadas(e.target.valueAsNumber || 0)}
                        style={{ ...inputStyle, paddingLeft: '35px' }}
                    />
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                        ⏳
                    </span>
                </div>
            </div>
            
            {/* Fila 3: Plataforma y Estado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>Plataforma</label>
                <select 
                    value={plataforma} 
                    onChange={(e) => setPlataforma(e.target.value as any)} 
                    style={inputStyle}
                >
                    <option value="PC">PC</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Xbox">Xbox Series</option>
                    <option value="Switch">Nintendo Switch</option>
                    <option value="Nintendo 3DS">Nintendo 3DS</option>
                    <option value="Otro">Otras plataformas</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '5px' }}>Progreso actual</label>
                <select 
                    value={estado} 
                    onChange={(e) => setEstado(e.target.value as any)} 
                    style={inputStyle}
                >
                    <option value="jugando">🕹️ Jugando ahora</option>
                    <option value="pendiente">⏳ En la lista de espera</option>
                    <option value="completado">🏆 Completado al 100%</option>
                </select>
            </div>

            {/* Botón de envío */}
            <button 
                type="submit" 
                disabled={!titulo || !genero}
                style={{ 
                    gridColumn: '1 / -1',
                    padding: '16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: (!titulo || !genero) ? '#334155' : '#3b82f6',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: (titulo && genero) ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    marginTop: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}
            >
                {(!titulo || !genero) ? 'Rellena los datos' : 'Añadir a la Bóveda'}
            </button>
        </form>  
    );
}