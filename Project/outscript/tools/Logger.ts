///<reference path="./LocalStorageUtils.ts"/>

namespace Tools {
    export class Logger {
        /** 
        * 是否开启log
        */
        public static _enableLog = Tools.LocalStorageUtils.getNumber("5_", 0) == 1;
        public static get EnableLog(): boolean {
            return this._enableLog;
        }
        public static set EnableLog(value) {
            this._enableLog = value;
            Tools.LocalStorageUtils.setNumber("5_", value ? 1 : 0);
        }
        private constructor() { }
        public static log(arg, tag?: string) {
            if (this._enableLog == false) return;
            if (tag != null && tag != undefined) {
                console.log(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg} `);
            } else {
                console.log(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static warn(arg, tag?: string) {
            if (this._enableLog == false) return;
            if (tag != null && tag != undefined) {
                console.warn(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            } else {
                console.warn(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static error(arg, tag?: string) {
            if (this._enableLog == false) return;
            if (tag != null && tag != undefined) {
                console.error(`[${tag}] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            } else {
                console.error(`[notag] [${TimeManager.Instance.realTimeSinceStartScene.toFixed(3)}] ${arg}`);
            }
        }
        public static info(arg) {
            if (this._enableLog == false) return;
            console.info(arg);
        }
    }
}

var Logger = Tools.Logger;