namespace Tools {
    export class Logger {
        private constructor() { }
        public static log(arg, tag?: string) {
            if (tag != null && tag != undefined) {
                console.log(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg} `);
            } else {
                console.log(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static warn(arg, tag?: string) {
            if (tag != null && tag != undefined) {
                console.warn(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            } else {
                console.warn(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static error(arg, tag?: string) {
            if (tag != null && tag != undefined) {
                console.error(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            } else {
                console.error(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static info(arg) {
            console.info(arg);
        }
    }
}

var Logger = Tools.Logger;