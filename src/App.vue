<template>
    <Stage :width="800" :height="600" :background-color="0x651701">
        <Assets :resolves="resolves" #default="{ progress }" :onResolved="onResolved">
            <container v-if="store.textures">
                <sprite :texture="store.textures.gameBg" />
                <ComponentView />
            </container>
            <text v-else :anchor="0.5" :position="{ x: screen.width / 2, y: screen.height / 2 }" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">
                Loading... {{ (progress * 100).toFixed() }}%
            </text>
        </Assets>
    </Stage>
</template>



<script setup lang="ts">
import { computed, watch } from 'vue';
import { Stage, Assets, AssetsResolvers, useScreen } from 'vue3-pixi';
import { storeToRefs } from 'pinia';
import { Texture as TextureType, Resource as ResourceType } from 'pixi.js';

import { useStore } from '@/store';
import { GameState } from '@/types/types';

import StartView from '@/scenes/StartScene.vue';
import GameView from '@/scenes/GameScene.vue';
import EndView from '@/scenes/EndScene.vue';

const screen = useScreen();
const store = useStore();

const resolves: AssetsResolvers = {
    gameBg: import('@/assets/images/gameBg.jpg'),
    explosionSprite: import('@/assets/images/explosionSprite.png'),
    foodSprite: import('@/assets/images/foodSprite.png'),
    playerSprite: import('@/assets/images/playerSprite.png'),
    playBtn: import('@/assets/images/playBtn.png'),
    gameLogo: import('@/assets/images/gameLogo.png'),
};

const { gameState } = storeToRefs(store);

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

function onResolved(textures: Record<string, TextureType<ResourceType>>) {
    store.setTextures(textures);
}

watch(gameState, () => {
    if (gameState.value === GameState.Playing) store.startNewGame();
});

</script>
