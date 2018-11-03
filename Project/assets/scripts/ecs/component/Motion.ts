/**
 * 移动组件
 */
export default class Motion implements ECS.IComponentData {
    public speed: number;
    public v: cc.Vec2;
}