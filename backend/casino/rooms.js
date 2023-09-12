import { roomConfig } from "./config.js";

export function createRoom(data) {
    return {...roomConfig, ...data}
}