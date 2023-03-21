import io, {Socket} from "socket.io-client";
import GameState from "../backend/models/GameState";
import {SocketEvents} from "../backend/managers/SocketManager";
import Client from "./Client";
import ClientGameState from "./ClientGameState";

export default class SocketClient{
    private _socket: Socket
    public socketId: string;

    public isGetHisFirstGameState = false;
     constructor(private _client: Client) {
        this._socket = io();
        this._socket.on("connect", () => {
            console.log("Connected to server");
            this.socketId = this._socket.id;
            this._init();
        });
    }

    _init(){
        this._socket.on(SocketEvents.UPDATE, (gameState: GameState) => {
            //Check if the UI needs to be updated
            //Compare the current currentPLayer with the new one
            const previousGameState = {...this._client.currentGameState};


            this._client.currentGameState = new ClientGameState(gameState, this.socketId);

            if (
                this._client.currentGameState.isCurrentExist() &&
                previousGameState.currentPlayer !== undefined &&
                (
                previousGameState.currentPlayer.endurance != this._client.currentGameState.currentPlayer.endurance ||
                previousGameState.currentPlayer.hp != this._client.currentGameState.currentPlayer.hp
                )
            ) {
                this._client.gui.isUIHaveChanged = true;
            }

            if(!this.isGetHisFirstGameState){
                this.isGetHisFirstGameState = true;
                this._client.gui.init();
            }
        })
    }
}
