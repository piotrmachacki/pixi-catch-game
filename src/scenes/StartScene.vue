<template>
    <container>
        <sprite :texture="store.textures.gameLogo" :anchor="0.5" :x="screen.width / 2" :y="100" />
        <sprite :texture="store.textures.playBtn" :anchor="0.5" :x="screen.width / 2" :y="(screen.height / 2) + 100" cursor="pointer" @click="startGame" />
    </container>
</template>



<script setup lang="ts">
import { useScreen } from 'vue3-pixi';
import { GameState } from '@/types/types';
import { useStore } from '@/store';

const screen = useScreen();
const store = useStore();

function startGame() {
    store.setGameState(GameState.Playing);
}
</script>



<style scoped>
</style>

