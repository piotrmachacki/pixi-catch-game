<template>
    <container>
    </container>
</template>


<script setup lang="ts">
import type { Texture as TextureType } from 'pixi.js';
import { ref, Ref as RefType, watch } from 'vue';
import { Rectangle, Texture, AnimatedSprite } from 'pixi.js';
import { useApplication } from 'vue3-pixi';

import { ExplosionType } from '@/types/types';
import { useStore } from '@/store';

const pixiApp = useApplication();
const store = useStore();

const explosionTexture = store.textures.explosionSprite.baseTexture;

let explosionFrames: TextureType[] = [];
for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
        let frame: TextureType = new Texture(explosionTexture, new Rectangle(i * 32, j * 32, 32, 32));
        explosionFrames.push(frame);
    }
}

const explosions: RefType<ExplosionType[]> = ref([]);

let animatedSprite: RefType<AnimatedSprite | null> = ref(null);

function addAnimatedSprite() {
    for (let i = 0; i < explosions.value.length; i++) {
        const explosion: ExplosionType = explosions.value[i];
        animatedSprite.value = new AnimatedSprite(explosionFrames);
        animatedSprite.value.loop = false;
        animatedSprite.value.x = explosion.x;
        animatedSprite.value.y = explosion.y;
        animatedSprite.value.onComplete = () => {
            explosions.value.splice(i, 1); // Remove the object from the array
            if (animatedSprite.value) pixiApp.value?.stage.removeChild(animatedSprite.value);
        };
        pixiApp.value?.stage.addChild(animatedSprite.value);
        animatedSprite.value.play();
    }
}

watch(explosions, addAnimatedSprite, { deep: true });

defineExpose({ explosions });
</script>
