<template>
    <container>
        <animated-sprite :visible="characterState === CharacterState.Stay" :textures="characterStayFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
        <animated-sprite :visible="characterState === CharacterState.MoveRight" :textures="characterMoveRightFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
        <animated-sprite :visible="characterState === CharacterState.MoveLeft" :textures="characterMoveLeftFrames" :x="characterX" :y="characterY" :play="true" :anchor="0.5" :animation-speed="0.1" />
    </container>
</template>


<script setup lang="ts">
import { ref, onMounted, Ref as RefType } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import type { Resource as ResourceType, Texture as TextureType } from 'pixi.js';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import { useScreen, useApplication } from 'vue3-pixi';
import knightChar from '@/assets/images/knightChar.png';
import { CharacterState } from '@/types';

const screen = useScreen();
const pixiApp = useApplication();

const characterTexture = BaseTexture.from(knightChar);
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
    const min = 30;
    const max = screen.value.width - 30;
    let position = characterX.value + x;
    if (position < min) position = min;
    if (position > max) position = max;
    characterX.value = position;
};

onMounted(() => {
    pixiApp.value?.ticker.add(() => {
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
    });
});

function getBounds() {
    return { x: characterX.value - (characterFrames[0].width / 2), y: characterY - (characterFrames[0].height / 2), width: characterFrames[0].width, height: characterFrames[0].height };
}

defineExpose({ getBounds });
</script>
