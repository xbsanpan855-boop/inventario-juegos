import type { Game } from "../types";

interface GameCardProps {
    data: Game;
    onDelete: (id: string) => void;
}

export function GameCard({ data, onDelete }: GameCardProps) {
    const statusColor =
        data.estado === 'completado' ? '#4ade80' :
        data.estado === 'pendiente' ? '#f87171' :
        '#fbbf24';

    return (
        <div style={{ 
            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
            padding: '20px', 
            borderRadius: '16px', 
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            border: '1px solid #334155',
            transition: 'transform 0.2s',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                bottom: 0, 
                width: '6px', 
                backgroundColor: statusColor 
            }} />

            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4rem', color: '#f8fafc' }}>
                {data.titulo}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem', color: '#94a3b8' }}>
                <p style={{ margin: 0 }}>🎮 Plataforma: <span style={{ color: '#e2e8f0' }}>{data.plataforma}</span></p>
                <p style={{ margin: 0 }}>⏱️ Tiempo: <span style={{ color: '#e2e8f0' }}>{data.horasJugadas}h</span></p>
                <p style={{ margin: 0 }}>📁 Género: <span style={{ color: '#e2e8f0' }}>{data.genero}</span></p>
            </div>
            
            <div style={{ 
                marginTop: '16px', 
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: `${statusColor}22`,
                border: `1px solid ${statusColor}`,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: statusColor,
                letterSpacing: '1px'
            }}>
                {data.estado.toUpperCase()}     
        </div>
        <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
            <button 
            onClick={() => onDelete(data.id)}
            style={{ 
                backgroundColor: '#ff4444', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px', 
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            >
            Eliminar
            </button>
            </div>
    </div>
    );
}