import {SocketEvents} from "../backend/managers/SocketManager";
import Log from "../backend/utils/Log";
import SocketClient from "./SocketClient";
import GUI from "./GUI";
import ClientGameState from "./ClientGameState";

export default class Client{

    private socketClient: SocketClient;
    public gui: GUI;


    public currentGameState: ClientGameState;
    constructor() {
        this.socketClient = new SocketClient(this);
        this.gui = new GUI(this);
    }
    _socketEvent(event: SocketEvents){
        Log.debug(`Client: ${event} event received`)
    }


    _keyboardEvent(){
        //Keyboard events

    }
}
