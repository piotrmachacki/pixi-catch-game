<template>
    <container>
    </container>
</template>


<script setup lang="ts">
import type { Texture as TextureType } from 'pixi.js';
import { ref, Ref as RefType, watch } from 'vue';
import { Rectangle, Texture, AnimatedSprite } from 'pixi.js';
import { useApplication } from 'vue3-pixi';

import { CoinType } from '@/types/types';
import { useStore } from '@/store';

const pixiApp = useApplication();
const store = useStore();

const coinTexture = store.textures.coinSprite.baseTexture;

let coinFrames: TextureType[] = [];
for (let i = 0; i < 8; i++) {
    let frame: TextureType = new Texture(coinTexture, new Rectangle(i * 16, 0, 16, 16));
    coinFrames.push(frame);
}

const coins: RefType<CoinType[]> = ref([]);

function addAnimatedSprite() {
    for (let i = 0; i < coins.value.length; i++) {
        const coin: CoinType = coins.value[i];
        const animatedSprite: AnimatedSprite = new AnimatedSprite(coinFrames);
        animatedSprite.loop = false;
        animatedSprite.x = coin.x;
        animatedSprite.y = coin.y;
        animatedSprite.anchor.set(0.5, 0.5);
        animatedSprite.onComplete = () => {
            coins.value.splice(i, 1); // Remove the object from the array
            pixiApp.value?.stage.removeChild(animatedSprite);
        };
        pixiApp.value?.stage.addChild(animatedSprite);
        animatedSprite.play();
    }
}

watch(coins, addAnimatedSprite, { deep: true });

defineExpose({ coins });
</script>
