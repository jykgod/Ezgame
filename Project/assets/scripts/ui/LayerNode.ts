import UIBase from "./UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerNode extends UIBase {

    /**
     * 用于管理layer状态的状态机
     * 一个UI界面即为一个状态
     * 除了层级下显示的所有UI之外还包含一个空状态,初始化时便拥有该状态
     */
    private stateMachine: FSM.StateMachine;

    /**
     * 初始化数据
     */
    onLoad() {
        Logger.log("onLoad", this.name);
        let widget = this.node.addComponent(cc.Widget);
        widget.right = widget.left = widget.top = widget.bottom = 0;
        this.stateMachine = FSM.StateMachine.GetBuilder().AddState(FSM.StateMachine.NONE).build();
        this.stateMachine.ChangeState(FSM.StateMachine.NONE.stateType);
    }

    start(){
        Logger.log("start", this.name);
    }


    onEnable() {
        Logger.log("onEnable", this.name);
    }

    onDisable() {
        Logger.log("onDisable", this.name);
    }

    onDestroy() {
    }

    unuse(){
        Logger.log("unuse", this.name);
    }

    reuse(arg){
        Logger.log("reuse", this.name);
        Logger.info(arg);
    }

    show(){
        Logger.log("show", this.name);
    }

    hide(){
        Logger.log("hide", this.name);
    }
}