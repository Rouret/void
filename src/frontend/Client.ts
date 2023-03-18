import {SocketEvents} from "../backend/managers/SocketManager";
import Log from "../backend/utils/Log";
import SocketClient from "./SocketClient";
import GUI from "./GUI";
import Keyboard, {KeyboardState} from "./Keyboard";

export default class Client{

    private _socketClient: SocketClient;
    private _gui: GUI;
    private _keyboard: Keyboard;
    private _keyboardState: KeyboardState;
    constructor() {
        this._socketClient = new SocketClient();
        this._gui = new GUI();
        this._keyboard = new Keyboard();
        this._keyboardState = new KeyboardState(this,this._keyboard);
    }
    _socketEvent(event: SocketEvents){
        Log.debug(`Client: ${event} event received`)
    }

    _keyboardEvent(){
        //Keyboard events

    }
}
