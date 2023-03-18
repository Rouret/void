import {SocketEvents} from "../backend/managers/SocketManager";
import Log from "../backend/utils/Log";
import SocketClient from "./SocketClient";
import GUI from "./GUI";

export default class Client{

    private _socketClient: SocketClient;
    private _gui: GUI;
    constructor() {
        this._socketClient = new SocketClient();
        this._gui = new GUI();
    }
    _socketEvent(event: SocketEvents){
        Log.debug(`Client: ${event} event received`)
    }
}
