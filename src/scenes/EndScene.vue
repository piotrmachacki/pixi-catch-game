<template>
    <text :position="{ x: screen.width / 2, y: 100 }" :anchor="0.5" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">YOUR SCORE: {{ store.getScore }}</text>
    <text :position="{ x: screen.width / 2, y: screen.height / 2 - 40 }" :anchor="0.5" :style="{ fill: 'white', fontFamily: 'Comic Sans MS', fontSize: 60 }">Game Over</text>
    <sprite :texture="playBtn" :anchor="0.5" :x="screen.width / 2" :y="(screen.height / 2) + 100" cursor="pointer" @click="startGame" />
</template>



<script setup lang="ts">
import { useScreen } from 'vue3-pixi';
import { GameState } from '@/types/types';
import playBtn from '@/assets/images/playBtn.png';
import { useStore } from '@/store';

const screen = useScreen();
const store = useStore();

function startGame() {
    store.setGameState(GameState.Playing);
}
</script>



<style scoped>
</style>
