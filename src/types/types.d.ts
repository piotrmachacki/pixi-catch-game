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
    id: number;
    texture: TextureType;
    x: number;
    y: number;
    speed: number;
    getBounds: () => BoundsType;
}
