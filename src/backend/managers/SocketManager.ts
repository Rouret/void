import {Server, Socket} from "socket.io";
import Game from "../Game";
import Log from "../utils/Log";

export class SocketManager{
    private _sockets: Array<Socket> = [];
    private _tasks: Array<SocketTask> = [];

    constructor(
        private _game : Game,
        private _io: Server
    ){
        this._io.on(SocketEvents.CONNECTION, (socket: Socket) => {
            this._sockets.push(socket);
            //Add all the current tasks to the new socket
            this._tasks.forEach(task => {
                socket.on(task.eventName, task.task);
            })
            this._game._socketEvent(SocketEvents.CONNECTION, socket);
            Log.debug(`Player connected: ${socket.id}.`);

            socket.on(SocketEvents.DISCONNECT, () => {
                Log.debug(
                    `Player disconnected: ${socket.id}.`
                );
                this._game._socketEvent(SocketEvents.DISCONNECT, socket);
            });
        });
    }

    addTaskEvent(event: SocketEvents, task: (data) => void){
        this._tasks.push(new SocketTask(event, task));
        this._sockets.forEach(socket => {
            socket.on(event, task);
        });
    }

    removeTaskEvent(event: SocketEvents){
        this._sockets.forEach(socket => {
            socket.off(event, () => {});
        });
    }

}

 class SocketTask {
    eventName: string;
    task: (...args) => void;
    constructor(eventName: string, task: (...args) => void) {
        this.eventName = eventName;
        this.task = task;
    }
}
export enum SocketEvents{
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    UPDATE = "update",
}


