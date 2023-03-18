export default class Coordinate{
    constructor(
        public x: number,
        public y: number,
    ){}

    moveTo(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    moveBy(x: number, y: number){
        this.x += x;
        this.y += y;
    }


}
