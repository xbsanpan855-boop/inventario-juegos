import type { Game } from "../types";
import { GameCard } from "./GameCard";

interface GameLIstProps {
    items: Game[];
    onDelete: (id: string) => void;
}

export function GameList({ items, onDelete }: GameLIstProps) {
    if(items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
                <p>📭 Tu biblioteca está vacía.</p>
            </div>
        )
    }

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '25px',
            padding: '20px 0'
        }}>
            {items.map((item) => (
                <GameCard key={item.id} data={item} onDelete={onDelete}/>
            ))}
        </div>
    );
}