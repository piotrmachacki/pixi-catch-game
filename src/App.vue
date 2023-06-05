<template>
    <Stage :width="800" :height="600" :background-color="0x651701">
        <Assets :resolves="resolves" #default="{ textures, progress }">
            <container v-if="textures">
                <sprite :texture="textures.gameBg" />
                <ComponentView @changeGameState="handleChangeGameState"></ComponentView>
            </container>
            <text v-else :anchor="0.5" :position="{ x: screen.width / 2, y: screen.height / 2 }" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">
                Loading... {{ (progress * 100).toFixed() }}%
            </text>
        </Assets>
    </Stage>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue';
import { Stage, Assets, AssetsResolvers, useScreen } from 'vue3-pixi';

import { useStore } from '@/store';
import { GameState } from '@/types';

import StartView from '@/scenes/StartScene.vue';
import GameView from '@/scenes/GameScene.vue';
import EndView from '@/scenes/EndScene.vue';

const screen = useScreen();
const store = useStore();

const resolves: AssetsResolvers = {
    gameBg: import('@/assets/images/gameBg.jpg'),
};

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
    if (gameState.value === GameState.Playing) store.startNewGame();
}

</script>



<style scoped>
</style>
