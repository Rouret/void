import express from "express";
import path from "path";
import http from "http";
import {Server, Socket} from "socket.io";
import Game from "./Game";
import {SocketEvents} from "./managers/SocketManager";

export default class GameServer {
	app: express.Application;
    server: http.Server;
	io: Server;
	port: number;
    publicFolder: string;
    viewsFolder: string;
    lastUpdate: number;
    step: number;
    game:Game;

    static NB_TICK = 60;

	constructor() {
		this.app = express();
        this.server = http.createServer(this.app);
		this.io = new Server(this.server);
		this.port = 3000;
        this.publicFolder = "../../dist";
        this.viewsFolder = "../../views";

        this.step = 1000 / GameServer.NB_TICK;
	}

	_setupExpress() {
        this.app.use(express.static(path.join(__dirname, this.publicFolder)));

        this.app.get("/", (req : any, res: any) => {
            res.sendFile(path.join(__dirname, this.viewsFolder, "index.html"));
        });

		this.server.listen(this.port, () => {
            console.log(`listening on *:${this.port}`);
        });
    }

    _loop() {
        const now = Date.now();
        const dt = now - this.lastUpdate;
        this.lastUpdate = now;
        this.game.update(dt);

        const gameState = this.game.getGameState();

        this.io.emit(SocketEvents.UPDATE, gameState);
    }


	public start() {
		this._setupExpress();

        this.game = new Game(this.io);

        setInterval(() => {
            this._loop();
        }, 1000 / GameServer.NB_TICK);


		console.log("GameServer started");
	}
}
