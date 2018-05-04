/**
 * 统一管理UI的切换时动画
 * 保持游戏UI动画风格的一致性
 */
class UIAnimationUtils {
    /**
     * 缩放进入动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromScale 起始大小
     * @param toScale 目标大小
     */
    public static ScaleIn(node: cc.Node, callBack?: () => void, fromScale: number = 0, toScale: number = 1) {
        node.active = true;
        node.scale = fromScale;
        node.stopAllActions();
        let scalIn = cc.scaleTo(0.5, toScale).easing(cc.easeBackOut());
        if (callBack != undefined && callBack != null) {
            let sequence = cc.sequence(scalIn, cc.callFunc(callBack));
            node.runAction(sequence);
        } else {
            node.runAction(scalIn);
        }
    }

    /**
     * 缩放退出动画
     * 注意：动画完成后会隐藏节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromScale 起始大小
     * @param toScale 目标大小
     */
    public static ScaleOut(node: cc.Node, callBack?: () => void, fromScale: number = 1, toScale: number = 0) {
        node.scale = fromScale;
        node.stopAllActions();
        let scalIn = cc.scaleTo(0.5, toScale).easing(cc.easeBackIn());
        let sequence = cc.sequence(scalIn, cc.callFunc(() => {
            node.active = false;
            (callBack != undefined && callBack != null) && callBack();
        }));
        node.runAction(sequence);
    }
}