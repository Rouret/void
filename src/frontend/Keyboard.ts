import Client from "./Client";
import Log from "../backend/utils/Log";

export default class Keyboard {
    public keyboardConfig: KeyboardConfig = new KeyboardConfig(
        "z",
        "s",
        "q",
        "d")
}

class KeyboardConfig {
    constructor(
        public foward: string,
        public backward: string,
        public left: string,
        public right: string,
    ) {}
}

export class KeyboardState{
    public foward: boolean = false;
    public backward: boolean = false;
    public left: boolean = false;
    public right: boolean = false;

    constructor(private _client:Client,private _keyboard:Keyboard) {
        window.addEventListener("keydown", (e) => {
            this._update(e.key,true)
        });

        window.addEventListener("keyup", (e) => {
            this._update(e.key,false)
        });
    }

    _update(key:string,value:boolean){
        //Log.debug(`Keyboard: ${key} ${value?"pressed":"released"}`)
        switch (key) {
            case this._keyboard.keyboardConfig.foward:
                this.foward = value;
                break;
            case this._keyboard.keyboardConfig.backward:
                this.backward = value;
                break;
            case this._keyboard.keyboardConfig.left:
                this.left = value;
                break;
            case this._keyboard.keyboardConfig.right:
                this.right = value;
                break;
        }
    }
}

