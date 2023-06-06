import { defineStore } from 'pinia';
import { GameState } from '@/types/types';

export const useStore = defineStore('game', {
    state: () => {
        const MAX_LIFE = 10;
        return {
            gameState: GameState.Start,
            textures: null,
            maxLife: MAX_LIFE,
            life: MAX_LIFE,
            score: 0,
            highScore: 0,
            level: 1,
        };
    },
    getters: {
        getGameState: (state) => state.GameState,
        getTextures: (state) => state.textures,
        getTexture: (state) => (textureName) => state.textures[textureName],
        getLife: (state) => state.life,
        getMaxLife: (state) => state.maxLife,
        getScore: (state) => state.score,
        getHighScore: (state) => state.highScore,
        getLevel: (state) => state.level,
    },
    actions: {
        setGameState(state) {
            this.gameState = state;
        },
        setTextures(textures) {
            this.textures = textures;
        },
        reduceLife() {
            this.life--;
            if (this.life <= 0) this.gameState = GameState.End;
        },
        addScore(number) {
            this.score += number;
            if (this.score > this.highScore) this.highScore = this.score;
        },
        increaseLevel() {
            this.level++;
        },
        startNewGame() {
            this.life = this.maxLife;
            this.score = 0;
            this.level = 1;
        },
    },
});

export default useStore;
