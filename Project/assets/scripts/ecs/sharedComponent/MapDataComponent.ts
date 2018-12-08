import MapCeil from "../../struct/MapCeil";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import MapCeilComponent from "../component/MapCeilComponent";

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
     * 地图中心位置对应的逻辑坐标是否发生过改变
     */
    public centerPositionDirty: boolean = false;
    /**
     * 可视区的宽度(并非玩家属性的可视区域，而是客户端渲染区域)
     */
    public viewWidth: number = 0;
    /**
     * 可视区的高度(并非玩家属性的可视区域，而是客户端渲染区域)
     */
    public viewHeight: number = 0;
    /**
     * mapceil缓冲区的宽度
     */
    public cacheWidth: number = 50;
    /**
     * mapceil缓冲区的高度
     */
    public cacheHeight: number = 50;
    /**
     * 服务器处理后数据:每个地块的类型(这部分数据的缓存规则并不是由mapceil的缓存规则限制的！)
     */
    public ceilsData: Array<Array<number>> = new Array<Array<number>>();
    /**
     * 从服务推送过来的发生地形改变的地块或是新的地块数据
     */
    public ceilsFromServer: Array<SimCivil.Contract.TileDto> = new Array<SimCivil.Contract.TileDto>();
    /**
     * 在可视区内的地块数据(并非玩家属性的可视区域，而是客户端渲染区域)
     */
    public mapCeilsInView: Array<MapCeilComponent> = new Array<MapCeilComponent>();
    /**
     * mapceil的位置信息是否已经初始化完成
     */
    public ceilsPosistionInied = false;
    /**
     * TODO:地图上面的物体
     */
}