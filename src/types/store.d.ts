declare module '@/store' {
    function useStore<T = any>(key?: string): T;

    export interface GameState {
        textures: any | null;
        maxLife: number;
        life: number;
        score: number;
        highScore: number;
        level: number;
        gameOver: boolean;
    }

    export interface GameStore {
        getTextures: () => any | null;
        getLife: () => number;
        getMaxLife: () => number;
        getScore: () => number;
        getHighScore: () => number;
        getLevel: () => number;
        isGameOver: () => boolean;
        setTextures: (textures: any) => void;
        reduceLife: () => void;
        addScore: (number: number) => void;
        increaseLevel: () => void;
        startNewGame: () => void;
    }
}
