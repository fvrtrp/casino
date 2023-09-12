import { roomConfig } from "./config.js";

export function createRoom(data, host) {
    return {...roomConfig, ...data, host}
}