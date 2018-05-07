import UIBase from "./UIBase";
import { UIManager } from "../manager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUI extends UIBase {

    @property(cc.Node)
    topNode: cc.Node = null;
    @property(cc.Node)
    bottomNode: cc.Node = null;
    @property(cc.Node)
    topLeftNode: cc.Node = null;
    @property(cc.Node)
    topRightNode: cc.Node = null;
    @property(cc.Node)
    bottomLeftNode: cc.Node = null;
    @property(cc.Node)
    bottomRightNode: cc.Node = null;
    @property(cc.Node)
    centerNode: cc.Node = null;

    onLoad() {
        this.topNode.position = cc.Vec2.UP.mulSelf(UIManager.Instance.Canvas.node.height);
        this.bottomNode.position = cc.Vec2.UP.mulSelf(-UIManager.Instance.Canvas.node.height);
        this.topLeftNode.position = cc.Vec2.RIGHT.mulSelf(-UIManager.Instance.Canvas.node.width);
        this.topRightNode.position = cc.Vec2.RIGHT.mulSelf(UIManager.Instance.Canvas.node.width);
        this.bottomLeftNode.position = cc.Vec2.RIGHT.mulSelf(-UIManager.Instance.Canvas.node.width);
        this.bottomRightNode.position = cc.Vec2.RIGHT.mulSelf(UIManager.Instance.Canvas.node.width);
    }

    public hide() {
        UIAnimationUtils.MoveOut(this.topNode, null, cc.Vec2.UP.mulSelf(UIManager.Instance.Canvas.node.height));
        UIAnimationUtils.MoveOut(this.bottomNode, null, cc.Vec2.UP.mulSelf(-UIManager.Instance.Canvas.node.height));
        UIAnimationUtils.MoveOut(this.topLeftNode, null, cc.Vec2.RIGHT.mulSelf(-UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.topRightNode, null, cc.Vec2.RIGHT.mulSelf(UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.bottomLeftNode, null, cc.Vec2.RIGHT.mulSelf(-UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.bottomRightNode, null, cc.Vec2.RIGHT.mulSelf(UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.ScaleOut(this.centerNode, null);
    }
    public show() {
        UIAnimationUtils.MoveIn(this.topNode, null);
        UIAnimationUtils.MoveIn(this.bottomNode, null);
        UIAnimationUtils.MoveIn(this.topLeftNode, null);
        UIAnimationUtils.MoveIn(this.topRightNode, null);
        UIAnimationUtils.MoveIn(this.bottomLeftNode, null);
        UIAnimationUtils.MoveIn(this.bottomRightNode, null);
        UIAnimationUtils.ScaleIn(this.centerNode, null);
    }
}
