import { Reading } from "./Interfaces";

export const getRandomFrom = (floor:number, ceiling:number) => {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then(res => res.json()).then(res => res.reverse())


 