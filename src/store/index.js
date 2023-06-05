import { defineStore } from 'pinia';

export const useStore = defineStore('game', {
    state: () => ({
        textures: null,
        maxLife: 3,
        life: 3,
        score: 0,
        highScore: 0,
        level: 1,
        gameOver: false,
    }),
    getters: {
        getTextures: (state) => state.textures,
        getLife: (state) => state.life,
        getMaxLife: (state) => state.maxLife,
        getScore: (state) => state.score,
        getHighScore: (state) => state.highScore,
        getLevel: (state) => state.level,
        isGameOver: (state) => state.gameOver,
    },
    actions: {
        setTextures(textures) {
            this.textures = textures;
        },
        reduceLife() {
            this.life--;
            if (this.life <= 0) this.gameOver = true;
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
            this.gameOver = false;
        },
    },
});
