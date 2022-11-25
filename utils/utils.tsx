export const getRandomFrom = (floor:number, ceiling:number) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}