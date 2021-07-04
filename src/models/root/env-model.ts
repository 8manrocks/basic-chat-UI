import { Keys } from "./env-keys-model";

export interface Env {
    cert: string,
    body: string,
    port: string,
    keys: Keys
}