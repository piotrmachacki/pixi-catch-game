<template>
    <text :position="{ x: screen.width / 2, y: screen.height / 2 }" :anchor="0.5" :style="{ fill: 'white', fontFamily: 'Comic Sans MS' }">Game Over</text>
</template>



<script setup lang="ts">
import { useScreen } from 'vue3-pixi';

const screen = useScreen();
</script>



<style scoped>
</style>
