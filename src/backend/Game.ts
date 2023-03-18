import World from "./models/World";
import Player from "./models/Player";
import Dimension from "./models/Dimension";
import {SocketEvents, SocketManager} from "./managers/SocketManager";
import Coordinate from "./models/Coordinate";
import Log from "./utils/Log";
import {Server} from "socket.io";


export default class Game{
    public world : World;
    public players : Player[];
    public socketManager : SocketManager;

    constructor(
        public io: Server
    ){

        this.socketManager = new SocketManager(this,io);

        //TODO: load world from database ?
        const worldDimensions = new Dimension(1000, 1000);
        this.world = new World("default_world",worldDimensions);
        this.players = [];

        this.socketManager.addTaskEvent(SocketEvents.TEST, (data) => {
            console.log(data);
        })
    }

    //Emit event from SocketManager
    _socketEvent(event: SocketEvents, socket: any){
        switch(event){
            case SocketEvents.CONNECTION:
                this._onPlayerConnected(socket);
                break;
            case SocketEvents.DISCONNECT:
                this._onPlayerDisconnected(socket);
                break;
        }
    }

    _onPlayerConnected(socket: any){
        const player = new Player(socket.id, socket, "Player", new Coordinate(0,0));
        this.players.push(player);
    }

    _onPlayerDisconnected(socket: any){
        const player = this.players.find(p => p.id == socket.id);
        if(player){
            const index = this.players.indexOf(player);
            this.players.splice(index, 1);
        }else{
            Log.error(`Player with ${socket.id} socketId not found`)
        }
    }

}
