/// <reference path="../tools/Timer.ts" />
/// <reference path="../tools/Builder.ts" />
/// <reference path="../tools/Logger.ts" />

namespace FSM {
    export class StateMachine {
        /**
         * 构造函数
         */
        private constructor() {
            this.timer = new Tools.Timer();
        }
        /**
         * 状态机索引表
         * key : stateType
         * value : state
         */
        private statesMap: Array<IState> = new Array<IState>();
        /**
         * 空状态
         * stateType 为 "0",这意味着自定义的状态的状态类型不能为"0"
         */
        public static readonly NONE: IState = {
            stateType: 0,
            StateEnter() {

            },
            StateEnd(time: number) {

            }
        }
        /**
         * 计时器
         */
        private timer: Tools.Timer;
        /**
         * 当前状态
         */
        private currentState: IState = null;
        /**
         * 状态机是否正在切换状态
         */
        private asyncChangingState: boolean = false;
        /**
         * 往状态机里面添加状态
         * @param state 状态
         */
        public AddState(state: IState) {
            if (this.statesMap[state.stateType] != null && this.statesMap[state.stateType] != undefined) {
                Tools.Logger.error(`attemp to add a same State into the StateMachine. StateMatchine:${name} State:${state.stateType}`);
                return;
            }
            this.statesMap[state.stateType] = state;
        }
        /**
         * 获得构造器
         */
        public static GetBuilder(): StateMachineBuilder {
            /**
             * 实例化构造器
             */
            return new StateMachineBuilder(new StateMachine());
        }
        /**
         * 立即切换状态机状态,hint:
         * 1.状态会立即切换
         * 2.处于异步切换状态的状态机是不能执行状态切换的
         * @param nextStateType 
         * @param args 
         */
        public ChangeState(nextStateType: number | string, ...args) {
            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                Tools.Logger.error(`attemp to change to the ${nextStateType} which ${name} not has!`, "FSM");
                return;
            }
            if (this.asyncChangingState) {
                Tools.Logger.error(`attemp to change to the ${nextStateType} when the stateMachine is changing with async method!`, "FSM");
                return;
            }
            if (this.currentState != null) {
                this.currentState.StateEnd(this.timer.time);
            }
            this.currentState = this.statesMap[nextStateType];
            this.timer.Reset();
            this.currentState.StateEnter(args);
        }
        /**
         * 异步切换状态机状态,hint:
         * 1.状态不会立即切换，而是异步执行
         * 2.状态机切换期间是不能再执行状态切换的!
         * @param nextStateType 
         * @param callback 成功切换状态机后执行的回调函数
         * @param args 
         */
        public async ChangeStateAsync(nextStateType: number | string, callback?: Function, ...args) {
            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                Tools.Logger.error(`attemp to change to the ${nextStateType} which ${name} not has!`, "FSM");
                return;
            }
            if (this.asyncChangingState) {
                Tools.Logger.error(`attemp to change to the ${nextStateType} when the stateMachine is changing with async method!`, "FSM");
                return;
            }
            this.asyncChangingState = true;
            if (this.currentState != null) {
                await this.currentState.StateEnd(this.timer.time);
            }
            this.currentState = this.statesMap[nextStateType];
            this.timer.Reset();
            await this.currentState.StateEnter(args);
            this.asyncChangingState = false;
            callback != undefined && callback();
        }
        /**
         * 状态机更新
         */
        public Update() {
            this.currentState != null && this.currentState.StateUpdate != undefined && !this.timer.paused && !this.asyncChangingState &&
                this.currentState.StateUpdate(this.timer.time);
        }

        /**
         * 状态机暂停
         */
        public Pause() {
            this.timer.Pause();
        }

        /**
         * 状态机恢复
         */
        public Resume() {
            this.timer.Resume();
        }
    }

    /**
     * 声明状态机构造器
     */
    class StateMachineBuilder extends Tools.Builder<StateMachine>{
        /**
         * 通过构造器向状态机添加状态
         * @param state 需要添加的状态
         */
        public AddState(state: IState): StateMachineBuilder {
            this.instance.AddState(state);
            return this;
        }
    }
}
