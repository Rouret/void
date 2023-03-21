import Coordinate from "./Coordinate";
import {Socket} from "socket.io";

export default class Player {
    private _speed: number = 0;
    public hp = 100;
    public maxHp = 100;
    public endurance = 100;
    public maxEndurance = 100;
    public isAlive = true;
    public sprinting = false;
    constructor(
        public id: string,
        public _socket: Socket,
        public name: string,
        private coordinate: Coordinate,
    ){}
}
