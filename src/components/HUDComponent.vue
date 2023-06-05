<template>
    <text :position="{ x: screen.width / 2, y: 20 }" :anchor="0.5" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">
        SCORE: {{ store.getScore }}
    </text>
    <text :position="{ x: 20, y: 20 }" :anchor="{ y: 0.5 }" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">
        LIFE: {{ store.getLife }} / {{ store.getMaxLife }}
    </text>
    <text :position="{ x: screen.width - 20, y: 20 }" :anchor="{ x: 1, y: 0.5 }" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">
        HIGHSCORE: {{ store.getHighScore }}
    </text>
</template>



<script setup lang="ts">
import { useScreen } from 'vue3-pixi';
import { useStore } from '@/store';

const screen = useScreen();
const store = useStore();
</script>
