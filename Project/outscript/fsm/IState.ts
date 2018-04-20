// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

namespace FSM {
    export interface IState {
        stateType: string;
        /**
         * 状态进入时调用
         * @param args 进入状态时接受的参数
         */
        StateEnter(...args): void;
        /**
         * 状态开始后每帧由状态机调用
         * @param currentStateTime 状态机自开始到当前帧经过的游戏时间
         */
        StateUpdate?(currentStateTime: number): void;
        /**
         * 状态结束时调用
         * @param currentStateTIme 状态机自开始到状态结束时经过的游戏时间
         */
        StateEnd(currentStateTIme: number): void;
    }
}