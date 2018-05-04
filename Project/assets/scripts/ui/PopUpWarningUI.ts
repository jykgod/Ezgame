import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopUpWarningUI extends UIBase {

    public hide() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleOut(this.node);
    }
    public show() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleIn(this.node);
    }

}
