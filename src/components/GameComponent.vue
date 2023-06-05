<template>
    <container>
        <PlayerEntity ref="playerElement" />
        <FoodsEntity ref="foodsElement" @hitFloor="setExplosion" />
        <ExplosionsEntity ref="explosionsEntity" />
    </container>
</template>



<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Rectangle } from 'pixi.js';
import { useApplication } from 'vue3-pixi';
import { useStore } from '@/store';

import { ExplosionType } from '@/types/types';

import PlayerEntity from '@/entities/PlayerEntity.vue';
import FoodsEntity from '@/entities/FoodsEntity.vue';
import ExplosionsEntity from '@/entities/ExplosionsEntity.vue';

const store = useStore();

const playerElement = ref<InstanceType<typeof PlayerEntity> | null>(null);
const foodsElement = ref<InstanceType<typeof FoodsEntity> | null>(null);
const explosionsEntity = ref<InstanceType<typeof ExplosionsEntity> | null>(null);

const pixiApp = useApplication();

function checkCollision() {
    if (!foodsElement.value || !playerElement.value) return;
    for (let i = 0; i < foodsElement.value.foods.length; i++) {
        const foodObject = foodsElement.value.foods[i];
        const rectangleCharacter = (() => {
            const { x, y, width, height } = playerElement.value.getBounds();
            return new Rectangle(x, y, width, height);
        })();
        const rectangleFoot = (() => {
            const { x, y, width, height } = foodObject.getBounds();
            return new Rectangle(x, y, width, height);
        })();
        if (rectangleCharacter.intersects(rectangleFoot)) {
            foodsElement.value.foods.splice(i, 1); // Remove the object from the array
            store.addScore(1);
        }
    }
}

onMounted(() => {
    pixiApp.value?.ticker.add(checkCollision);
});

onBeforeUnmount(() => {
    pixiApp.value?.ticker.remove(checkCollision);
});

function setExplosion(data: ExplosionType) {
    explosionsEntity.value?.explosions.push(data);
}

</script>
