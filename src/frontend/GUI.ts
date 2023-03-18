import Log from "../backend/utils/Log";

export default class GUI{
    private _canvas: HTMLCanvasElement = document.getElementById(
        "app"
    ) as HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;


    constructor() {
        this._ctx = this._canvas.getContext("2d");
        this._canvas.width = window.document.documentElement.clientWidth - 4;
        this._canvas.height = window.document.documentElement.clientHeight - 4;
        if (this._canvas.getContext("2d")) {
            this._init();
        }else{
            Log.error("Canvas is not supported");
        }
    }

    _init(){
        this.draw();

        requestAnimationFrame(this._init.bind(this))
    }

    draw(){
        this._ctx.fillStyle = "#444444";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
}
