export default class Log {
    static DEBUG = true;
    static prefix(name : string){
        return `[${name}]`;
    }

    static debug(message: string){
        if(!Log.DEBUG) return;
        console.log(`${Log.prefix("DEBUG")} ${message}`);
    }
    static print(message: string){
        console.log(`${Log.prefix("LOG")} ${message}`);
    }

    static error(message: string){
        console.error(`${Log.prefix("ERROR")} ${message}`);
    }
}

