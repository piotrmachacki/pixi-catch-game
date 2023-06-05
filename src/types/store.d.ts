declare module '@/store' {
    function useStore<T = any>(key?: string): T;

    export interface GameState {
        gameState: number;
        textures: any | null;
        maxLife: number;
        life: number;
        score: number;
        highScore: number;
        level: number;
    }

    export interface GameStore {
        getGameState: () => number;
        getTextures: () => any | null;
        getLife: () => number;
        getMaxLife: () => number;
        getScore: () => number;
        getHighScore: () => number;
        getLevel: () => number;
        setGameState: (state: number) => void;
        setTextures: (textures: any) => void;
        reduceLife: () => void;
        addScore: (number: number) => void;
        increaseLevel: () => void;
        startNewGame: () => void;
    }
}
