/**
 * 朝向组件
 */
export default class DirectionComponent implements ECS.IComponentData {
    public direction: cc.Vec2 = cc.Vec2.ZERO;
}