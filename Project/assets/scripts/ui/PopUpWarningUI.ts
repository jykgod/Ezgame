import UIBase from "./UIBase";
import { GloableUtils } from "../tools/GloableUtils";

const { ccclass, property } = cc._decorator;
/**
 * 警告弹窗，用来显示一些提示或者警告信息
 */
@ccclass
export default class PopupWarningUI extends UIBase {
    @property(cc.Label)
    /**
     * 警告提示的内容
     * 这里本来是打算用富文本的，但是为了配置简便还是用了label
     */
    public text : cc.Label = null;

    public hide() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleOut(this.node);
    }
    public show() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleIn(this.node);
    }

    public clickOk() {
        GloableUtils.TipsOnclickOk();
    }

    public clickCancel() {
        GloableUtils.TipsOnclickCancel();
    }
}
