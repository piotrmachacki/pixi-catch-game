<template>
    <container>
        <animated-sprite v-for="(explosion, index) in explosions" :key="explosion.id" :visible="true" :textures="explosionFrames" :x="explosion.x" :y="explosion.y" :play="true" :anchor="0.5" :animation-speed="1" :loop="false" @onComplete="removeExplosion(index)" />
    </container>
</template>


<script setup lang="ts">
import type { Texture as TextureType } from 'pixi.js';
import { ref, Ref as RefType } from 'vue';
import { Rectangle, Texture } from 'pixi.js';

import { ExplosionType } from '@/types/types';
import { useStore } from '@/store';

const store = useStore();

const explosionTexture = store.textures.explosionSprite.baseTexture;

let explosionFrames: TextureType[] = [];
for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
        let frame: TextureType = new Texture(explosionTexture, new Rectangle(i * 32, j * 32, 32, 32));
        explosionFrames.push(frame);
    }
}

function removeExplosion(i: number) {
    explosions.value.splice(i, 1); // Remove the object from the array
}

const explosions: RefType<ExplosionType[]> = ref([]);
</script>
