import { landingPageKeys } from "./landing-page-enums";
import { Env } from "src/models/root/env-model";
import { Keys } from "src/models/root/env-keys-model";

export class UrlHelper {
    private static envs: Env;
    static set envUrls(json: Env) {
        UrlHelper.envs = json;
    }

    static get cert(): string {
        return UrlHelper.envs.cert;
    }

    static get body(): string {
        return UrlHelper.envs.body;
    }

    static get port(): string {
        return UrlHelper.envs.port;
    }

    static get keys(): Keys {
        return UrlHelper.envs.keys;
    }
    
    public constructApi(key: string): string {
        return `${UrlHelper.cert}://${UrlHelper.body}:${UrlHelper.port}/${UrlHelper.keys[key as keyof Keys]}`
    }
    static getInstance(): UrlHelper {
        return new UrlHelper
    }
}