/**
 * 移动组件
 */
export default class MotionComponent implements ECS.IComponentData {
    public speed: number = 0;
    public v: cc.Vec2 = cc.Vec2.ZERO;
    public canMove: boolean = true;
}