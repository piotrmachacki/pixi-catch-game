<template>
    <container>
        <animated-sprite :visible="characterState === CharacterState.Stay" :textures="characterStayFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
        <animated-sprite :visible="characterState === CharacterState.MoveRight" :textures="characterMoveRightFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
        <animated-sprite :visible="characterState === CharacterState.MoveLeft" :textures="characterMoveLeftFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
    </container>
</template>


<script setup lang="ts">
import type { Resource as ResourceType, Texture as TextureType } from 'pixi.js';
import { ref, onMounted, onBeforeUnmount, Ref as RefType } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import { useScreen, useApplication } from 'vue3-pixi';

import playerSprite from '@/assets/images/playerSprite.png';

import { CharacterState } from '@/types/types';

import { setNumberInRange } from '@/utils';

const screen = useScreen();
const pixiApp = useApplication();

const characterTexture = BaseTexture.from(playerSprite);
const characterX: RefType<number> = ref(screen.value.width / 2);
const characterY: number = screen.value.height - 90;
const characterSpeed = 10;

let characterFrames: TextureType[] = [];
for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 8; i++) {
        let frame: TextureType = new Texture(characterTexture, new Rectangle(i * 84, j * 84, 84, 84));
        characterFrames.push(frame);
    }
}

const characterStayFrames: TextureType<ResourceType>[] = [
    characterFrames[0],
    characterFrames[1],
    characterFrames[2],
    characterFrames[3],
];

const characterMoveRightFrames: TextureType<ResourceType>[] = [
    characterFrames[14],
    characterFrames[15],
    characterFrames[16],
    characterFrames[17],
    characterFrames[18],
    characterFrames[19],
];

const characterMoveLeftFrames: TextureType<ResourceType>[] = [
    characterFrames[20],
    characterFrames[21],
    characterFrames[22],
    characterFrames[23],
    characterFrames[24],
    characterFrames[25],
];

const characterState = ref(CharacterState.Stay);

const { arrowleft, arrowright } = useMagicKeys();

const setCharacterXPosition = (x: number) => {
    characterX.value = setNumberInRange(characterX.value + x, 30, screen.value.width - 30);
};

function initControls() {
    if (arrowleft.value) {
        characterState.value = CharacterState.MoveLeft;
        setCharacterXPosition(-characterSpeed);
    }
    if (arrowright.value) {
        characterState.value = CharacterState.MoveRight;
        setCharacterXPosition(characterSpeed);
    }
    if (!arrowleft.value && !arrowright.value) {
        characterState.value = CharacterState.Stay;
    }
}

onMounted(() => {
    pixiApp.value?.ticker.add(initControls);
});

onBeforeUnmount(() => {
    pixiApp.value?.ticker.remove(initControls);
});

function getBounds() {
    return { x: characterX.value - (characterFrames[0].width / 2), y: characterY - (characterFrames[0].height / 2), width: characterFrames[0].width, height: characterFrames[0].height };
}

defineExpose({ getBounds });
</script>
