/**
 * 被挂上该组件的实体可以控制其移动
 */
export default class MotionControllerComponent implements ECS.IComponentData {
    /**
     * 操作类型
     */
    public type: number;
}