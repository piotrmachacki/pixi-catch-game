<template>
    <text @click="startGame">StartScene</text>
</template>



<script setup lang="ts">
import { GameState } from '@/types';

const emit = defineEmits<{
    (event: 'changeGameState', data: GameState): void;
}>();

function startGame() {
    emit('changeGameState', GameState.Playing);
}
</script>



<style scoped>
</style>

