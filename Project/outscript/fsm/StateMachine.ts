/// <reference path="../tools/Timer.ts" />
/// <reference path="../tools/Builder.ts" />

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
         * stateType 为 "null",这意味着自定义的状态的状态类型不能为"null"
         */
        public static readonly NONE: IState = {
            stateType: "null",
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
         * 往状态机里面添加状态
         * @param state 状态
         */
        public AddState(state: IState) {
            if (this.statesMap[state.stateType] != null && this.statesMap[state.stateType] != undefined) {
                console.error(`attemp to add a same State into the StateMachine. StateMatchine:${name} State:${state.stateType}`);
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
         * 状态机切换状态
         * 状态会立即被切换，所以尽量不要在状态机的update里切换状态，即使切换了也尽量不要再处理别的逻辑了(容易出现错误)
         * 关于是否立即切换这一点有点想要改动orz，目前还是就这么先用着吧
         * @param nextStateType 
         * @param args 
         */
        public ChangeState(nextStateType: string, ...args) {
            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                console.error(`attemp to change to the ${nextStateType} which ${name} not has!`);
                return;
            }
            if (this.currentState != null){
                this.currentState.StateEnd(this.timer.time);
            }
            this.timer.Reset();
            this.currentState = this.statesMap[nextStateType];
            this.currentState.StateEnter(args);
        }
        /**
         * 状态机更新
         */
        public Update() {
            if (this.currentState != null && this.currentState.StateUpdate != undefined) {
                this.currentState.StateUpdate(this.timer.time);
            }
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
