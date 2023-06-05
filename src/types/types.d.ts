export enum GameState {
    Start,
    Playing,
    End,
}

export enum CharacterState {
    Stay,
    MoveLeft,
    MoveRight,
}

export interface BoundsType {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FallingFoodType {
    id: string;
    texture: TextureType;
    x: number;
    y: number;
    speed: number;
    getBounds: () => BoundsType;
}

export interface ExplosionType {
    id: string;
    x: number;
    y: number;
}
