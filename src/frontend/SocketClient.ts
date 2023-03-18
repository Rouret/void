import io, {Socket} from "socket.io-client";
import GameState from "../backend/models/GameState";

export default class SocketClient{
    private _socket: Socket
    constructor() {
        this._socket = io();

        this._socket.emit("init", {
            message:"Hello World! From the frontend!"
        });

        this._socket.on("welcome", (messageFromServer) => {
            console.log(messageFromServer.message);
        });

        this._socket.on("update", (gameState : GameState) => {
            console.log(gameState);
        })
    }
}
