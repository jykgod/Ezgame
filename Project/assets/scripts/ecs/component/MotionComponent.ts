/**
 * 移动组件
 */
export default class MotionComponent implements ECS.IComponentData {
    public speed: number;
    public v: cc.Vec2;
}