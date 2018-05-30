import UIBase from "../UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingUI extends UIBase {
    public hide() {
        this.node.active = false;
        //throw new Error("Method not implemented.");
    }
    public show() {
        this.node.active = true;
        //throw new Error("Method not implemented.");
    }
}
