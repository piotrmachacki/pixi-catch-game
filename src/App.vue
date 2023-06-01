<template>
    <Stage :width="800" :height="600" :background-color="0x2980b9">
        <container>
            <sprite :texture="gameBg" />
            <ComponentView @changeGameState="handleChangeGameState"></ComponentView>
        </container>
    </Stage>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue';
import { Stage } from 'vue3-pixi';
import { GameState } from '@/types';
import StartView from '@/scenes/StartScene.vue';
import GameView from '@/scenes/GameScene.vue';
import EndView from '@/scenes/EndScene.vue';
import gameBg from '@/assets/images/gameBg.jpg';

const gameState = ref(GameState.Start);

const ComponentView = computed(() => {
    switch (gameState.value) {
        case GameState.Start:
            return StartView;
        case GameState.Playing:
            return GameView;
        case GameState.End:
            return EndView;
        default:
            return GameState.Start;
    }
});

function handleChangeGameState(state: GameState) {
    gameState.value = state;
}

</script>



<style scoped>
</style>
