import { defineStore } from 'pinia';

export const useStore = defineStore('game', {
    state: () => ({
        textures: null,
        life: 3,
        score: 0,
        level: 1,
        gameOver: false,
    }),
    getters: {
        getTextures: (state) => state.textures,
        getLife: (state) => state.life,
        getScore: (state) => state.score,
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
        },
        increaseLevel() {
            this.level++;
        },
        startNewGame() {
            this.life = 3;
            this.score = 0;
            this.level = 1;
            this.gameOver = false;
        },
    },
});
