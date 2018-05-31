const { ccclass, property, disallowMultiple } = cc._decorator;

/**
 * UI 基类
 */
@ccclass
@disallowMultiple
export default class UIBase extends cc.Component {
    /**
     * UI深度，用来管理ui层级
     */
    @property()
    public zIndex : number = 0;

    /**
     * 当通过UIManager.Instance.ShowUI第一次创建UI时调用
     */
    public init(){
        this.node.zIndex = this.zIndex;
    }

    /**
     * 当通过UIManager.Instance.HideUI隐藏UI时调用,用于播放关闭动画
     */
    public hide(){}
    /**
     * 当通过UIManager.Instance.ShowUI显示UI时调用,用于播放显示动画
     */
    public show(){}
}