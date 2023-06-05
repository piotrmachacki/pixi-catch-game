<template>
    <container>
        <sprite :texture="gameLogo" :anchor="0.5" :x="screen.width / 2" :y="100" />
        <sprite :texture="playBtn" :anchor="0.5" :x="screen.width / 2" :y="(screen.height / 2) + 100" cursor="pointer" @click="startGame" />
    </container>
</template>



<script setup lang="ts">
import { useScreen } from 'vue3-pixi';
import { GameState } from '@/types/types';
import gameLogo from '@/assets/images/gameLogo.png';
import playBtn from '@/assets/images/playBtn.png';

const screen = useScreen();

const emit = defineEmits<{
    (event: 'changeGameState', data: GameState): void;
}>();

function startGame() {
    emit('changeGameState', GameState.Playing);
}
</script>



<style scoped>
</style>

