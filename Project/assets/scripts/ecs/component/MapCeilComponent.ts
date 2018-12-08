import MapCeil from "../../struct/MapCeil";

/**
 * MapCeil
 */
export default class MapCeilComponent implements ECS.IComponentData {
    /**
     * 地块
     */
    public ceil: MapCeil;
    /**
     * UI位置
     */
    public pos: cc.Vec2;
    /**
     * 逻辑计算时是否发生过改变
     */
    public dirty: boolean;
    /**
     * 是否在可视区内(非玩家可视区域)
     */
    public inView: boolean;
    /**
     * UI是否需要改变
     */
    public uiDirty: boolean;
    /**
     * UI节点
     */
    public uiNode: cc.Node;
}