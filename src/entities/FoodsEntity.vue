<template>
    <container>
        <sprite v-for="object in fallingFoods" :key="object.id" :texture="object.texture" :x="object.x" :y="object.y" :anchor="0.5" />
    </container>
</template>


<script setup lang="ts">
import type { Texture as TextureType } from 'pixi.js';
import { ref, onMounted, onBeforeUnmount, Ref as RefType } from 'vue';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import { useScreen, useApplication } from 'vue3-pixi';
import { useStore } from '@/store';

import { getRandomInt, setNumberInRange } from '@/utils';

import foodSprite from '@/assets/images/foodSprite.png';

const store = useStore();
const screen = useScreen();
const pixiApp = useApplication();
const desiredObjectCount = 10;


interface BoundsType {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FallingFoodType {
    id: number;
    texture: TextureType;
    x: number;
    y: number;
    speed: number;
    getBounds: () => BoundsType;
}

const foodTexture = BaseTexture.from(foodSprite);

let foodFrames: TextureType[] = [];
for (let i = 0; i < 23; i++) {
    let frame: TextureType = new Texture(foodTexture, new Rectangle(i * 32, 0, 32, 32));
    foodFrames.push(frame);
}

const fallingFoods: RefType<FallingFoodType[]> = ref([]);

const spawnFallingFood = (): void => {
    const foodObject = {
        id: Math.random(),
        texture: foodFrames[getRandomInt(0, foodFrames.length - 1)],
        x: setNumberInRange(Math.random() * screen.value.width, 16, screen.value.width - 16),
        y: -(getRandomInt(50, 500)), // Start position above the screen,
        speed: Math.random() * 1 + 0.5,
        getBounds(): BoundsType { return { x: this.x - 16, y: this.y - 16, width: this.texture.width, height: this.texture.height }; }
    };
    fallingFoods.value.push(foodObject);
};

const updateFallingFoods = (): void => {
    for (let i = fallingFoods.value.length - 1; i >= 0; i--) {
        const object = fallingFoods.value[i];
        object.y += object.speed;

        // Check if the object has reached the bottom of the screen
        if (object.y > screen.value.height - 32) {
            fallingFoods.value.splice(i, 1); // Remove the object from the array
            store.reduceLife();
        }
    }

    // Check if there are fewer objects than desired
    if (fallingFoods.value.length < desiredObjectCount) {
        // setTimeout(spawnFallingFood, 100);
        spawnFallingFood();
    }
};

onMounted(() => {
    pixiApp.value?.ticker.add(updateFallingFoods);
});

onBeforeUnmount(() => {
    pixiApp.value?.ticker.remove(updateFallingFoods);
});

defineExpose({ foods: fallingFoods });
</script>