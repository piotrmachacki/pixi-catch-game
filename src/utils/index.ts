export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setNumberInRange(
    number: number,
    min: number,
    max: number
): number {
    let currentNumber = number;
    if (currentNumber < min) currentNumber = min;
    if (currentNumber > max) currentNumber = max;
    return currentNumber;
}

export const uuid = (): string =>
    `uuid-${Math.random().toString(36).substring(2)}`;
