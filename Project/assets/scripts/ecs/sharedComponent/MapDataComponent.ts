import MapCeil from "../../struct/MapCeil";

export default class MapDataComponent implements ECS.ISharedComponentData{
    public static instance: MapDataComponent;
    /**
     * 镜头挂载的节点
     */
    public cameraNode: cc.Node;
    /**
     * 地图中心位置对应的逻辑坐标
     */
    public centerPosition: cc.Vec2 = cc.Vec2.ZERO;
    /**
     * 地图的宽度
     */
    public width: number = 0;
    /**
     * 地图的高度
     */
    public height: number = 0;
    /**
     * 每个地块的类型和id
     */
    public ceils: Array<Array<MapCeil>> = new Array<Array<MapCeil>>();
    /**
     * 从服务推送过来的发生地形改变的地块或是新的地块数据
     */
    public ceilsFromServer: Array<SimCivil.Contract.TileDto> = new Array<SimCivil.Contract.TileDto>();
    /**
     * TODO:地图上面的物体
     */
}