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
     * @param fromScale 起始大小,默认为1
     * @param toScale 目标大小,默认为0
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

    /**
     * 位移进入动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param toPos 目标位置
     * @param fromPos 起始位置(默认为空，为空时从UI当前位置开始移动)
     */
    public static MoveIn(node: cc.Node, callBack?: () => void, toPos: cc.Vec2 = cc.Vec2.ZERO, fromPos: cc.Vec2 = null) {
        node.active = true;
        if (fromPos != null) node.position = fromPos;
        node.stopAllActions();
        let moveIn = cc.moveTo(1, toPos).easing(cc.easeBackOut());
        if (callBack != undefined && callBack != null) {
            let sequence = cc.sequence(moveIn, cc.callFunc(callBack));
            node.runAction(sequence);
        } else {
            node.runAction(moveIn);
        }
    }

    /**
     * 位移退出动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromPos 起始位置
     * @param toPos 目标位置
     */
    public static MoveOut(node: cc.Node, callBack?: () => void, toPos: cc.Vec2 = cc.Vec2.ZERO, fromPos: cc.Vec2 = null) {
        if (fromPos != null) node.position = fromPos;
        node.stopAllActions();
        let scalIn = cc.moveTo(1, toPos).easing(cc.easeBackIn());
        let sequence = cc.sequence(scalIn, cc.callFunc(() => {
            node.active = false;
            (callBack != undefined && callBack != null) && callBack();
        }));
        node.runAction(sequence);
    }
}