import MapCeil from "../../struct/MapCeil";

export default class MapDataComponent implements ECS.ISharedComponentData{
    public static instance: MapDataComponent;
    /**
     * 地图挂载的节点
     */
    public node: cc.Node;
    /**
     * 地图中心位置对应的逻辑坐标
     */
    public centerPosition: cc.Vec2;
    /**
     * 地图的宽度
     */
    public width: number;
    /**
     * 地图的高度
     */
    public height: number;
    /**
     * 每个地块的类型和id
     */
    public ceils: Array<MapCeil>;
    /**
     * TODO:地图上面的物体
     */
}