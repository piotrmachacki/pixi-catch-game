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

interface BoundsType {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FallingFoodType {
    id: string;
    texture: TextureType;
    x: number;
    y: number;
    speed: number;
    getBounds: () => BoundsType;
}

interface ExplosionType {
    id: string;
    x: number;
    y: number;
}
