/// <reference path="../manager/TimeManager.ts" />
namespace Tools {
    /**
     * 计时器
     */
    export class Timer {
        public constructor() {
            this.Reset();
        }
        /**
         * 计时器记录的当前时间
         */
        private startTime: number;
        /**
         * 计时器最近一次暂停的时间
         */
        private lastPauseTime: number;
        /**
         * 计时器是否处于暂停状态
         */
        private _paused: boolean;
        /**
         * 计时器是否处于暂停状态
         */
        public get paused(): boolean {
            return this._paused;
        }
        /**
         * 获取计时器时间
         */
        public get time(): number {
            a: TimeManager;
            if (this._paused == false) {
                return TimeManager.Instance.realTimeSinceStartScene - this.startTime;
            } else {
                return TimeManager.Instance.realTimeSinceStartScene - this.lastPauseTime;
            }
        }
        /**
         * 计时器复位
         */
        public Reset() {
            this._paused = false;
            this.startTime = TimeManager.Instance.realTimeSinceStartScene;
        }
        /**
         * 暂停计时器
         */
        public Pause() {
            if (this._paused == true) {
                return;
            }
            this._paused = true;
            this.lastPauseTime = TimeManager.Instance.realTimeSinceStartScene;
        }
        /**
         * 恢复暂停中的计时器
         */
        public Resume() {
            if (this._paused == false) {
                return;
            }
            this._paused = false;
            this.lastPauseTime = 0;
            this.startTime = this.startTime + TimeManager.Instance.realTimeSinceStartScene - this.lastPauseTime;
        }
    }
}