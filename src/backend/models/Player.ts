import Coordinate from "./Coordinate";
import {Socket} from "socket.io";

export default class Player {
    private _speed: number = 0;
    constructor(
        public id: string,
        public socket: Socket,
        public name: string,
        private coordinate: Coordinate,
    ){}
}
