import MapDataComponent from "../sharedComponent/MapDataComponent";
import MapCeil from "../../struct/MapCeil";
import MapCeilComponent from "../component/MapCeilComponent";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { GloableUtils } from "../../tools/GloableUtils";
import { ResourcesManager } from "../../manager/ResourcesManager";
import MapCeilUIComponent from "../../logic/map/MapCeilUIComponent";
import { EcsUtility } from "../utility/EcsUtility";

export default class MapSystem extends ECS.ComponentSystem {
    @ECS.inject(MapCeilComponent)
    public ceils: Array<MapCeilComponent>;

    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(MapDataComponent);
        MapDataComponent.instance.viewWidth = Math.ceil(cc.Canvas.instance.node.width / EcsUtility.LogicToUIRatio);
        MapDataComponent.instance.viewHeight = Math.ceil(cc.Canvas.instance.node.height / EcsUtility.LogicToUIRatio);
        this.InitCeilsPosition();
    }

    public OnDestroy(): void {
        ECS.World.active.EntitisManager.removeSharedComponent(MapDataComponent);
    }

    protected OnUpdate(): void {
        this.UpdateCeilsPosition();
        this.DealServerData();
        this.UpdateCeilsTexture();
    }

    private DealServerData(): void {
        let serverData = MapDataComponent.instance.ceilsFromServer;
        if (serverData.length > 0) {
            for (let i = 0; i < serverData.length; i++) {
                if (!MapDataComponent.instance.ceilsData[serverData[i].Position.Item1]) {
                    MapDataComponent.instance.ceilsData[serverData[i].Position.Item1] = [];
                }
                MapDataComponent.instance.ceilsData[serverData[i].Position.Item1][serverData[i].Position.Item2] = Math.floor(Math.random() * 3);//serverData[i].Terrain;
                /**
                 * TODO:这个地方应该将发生了地形改变的mapceil的dirty参数置为true!!!
                 */
            }
            MapDataComponent.instance.ceilsFromServer = new Array<SimCivil.Contract.TileDto>();
            // Logger.info(MapDataComponent.instance.ceilsData);
        }
    }
    /**
     * 初始化地块位置信息
     */
    private InitCeilsPosition(): void {
        let wNumber = MapDataComponent.instance.cacheWidth;
        let hNumber = MapDataComponent.instance.cacheHeight;
        let entityManager = ECS.World.active.EntitisManager;
        for (let i = 0; i < wNumber; i++) {
            for (let j = 0; j < hNumber; j++) {
                let entity = entityManager.CreateAEntity();
                entityManager.addComponent(entity, MapCeilComponent);
                let mcc = entityManager.GetComponent(entity, MapCeilComponent) as MapCeilComponent;
                mcc.pos = new cc.Vec2(i, j);
                mcc.ceil = new MapCeil();
                ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("Ceil"), (error, res) => {
                    let node = cc.instantiate<cc.Node>(res);
                    node.setParent(cc.Canvas.instance.node);
                    node.zIndex = GloableConstantUtils.mapZIndex;

                    let script = node.getComponent(MapCeilUIComponent);
                    script.mapCeil = mcc;
                    mcc.uiNode = node;
                });
                mcc.dirty = true;
            }
        }
        MapDataComponent.instance.ceilsPosistionInied = true;
    }

    private UpdateCeilsPosition(): void {
        if (MapDataComponent.instance.ceilsPosistionInied == false || MapDataComponent.instance.centerPositionDirty == false) return;
        let H = MapDataComponent.instance.cacheHeight;
        let W = MapDataComponent.instance.cacheWidth;
        let C = MapDataComponent.instance.centerPosition;
        let up = C.y + H / 2;
        let bottom = C.y - H / 2;
        let left = C.x - W / 2;
        let right = C.x + W / 2;
        let viewUp = C.y + MapDataComponent.instance.viewHeight / 2 + 0.5;
        let viewBottom = C.y - MapDataComponent.instance.viewHeight / 2 - 0.5;
        let viewLeft = C.x - MapDataComponent.instance.viewWidth / 2 - 0.5;
        let viewRight = C.x + MapDataComponent.instance.viewWidth / 2 + 0.5;
        let dirtyCeilsArr = new Array<MapCeilComponent>();
        for (let i = 0; i < this.ceils.length; i++) {
            if (this.ceils[i].pos.y > up) {
                this.ceils[i].pos.y = bottom + (this.ceils[i].pos.y - up) % H;
                this.ceils[i].dirty = true;
            }
            if (this.ceils[i].pos.y < bottom) {
                this.ceils[i].pos.y = up - (bottom - this.ceils[i].pos.y) % H;
                this.ceils[i].dirty = true;
            }
            if (this.ceils[i].pos.x > right) {
                this.ceils[i].pos.x = left + (this.ceils[i].pos.x - right) % W;
                this.ceils[i].dirty = true;
            }
            if (this.ceils[i].pos.x < left) {
                this.ceils[i].pos.x = right - (left - this.ceils[i].pos.x) % W;
                this.ceils[i].dirty = true;
            }
            if (this.ceils[i].dirty == true) {
                this.ceils[i].inView = this.ceils[i].pos.x < viewRight && this.ceils[i].pos.x > viewLeft && this.ceils[i].pos.y < viewUp && this.ceils[i].pos.y > viewBottom;
            }
        }
        // Logger.info(this.ceils);
        MapDataComponent.instance.centerPositionDirty = false;
    }

    private UpdateCeilsTexture(): void {
        for (let i = 0; i < this.ceils.length; i++) {
            if (this.ceils[i].inView && this.ceils[i].dirty) {
                this.ceils[i].uiNode.active = true;
                let x = Math.round(this.ceils[i].pos.x);
                let y = Math.round(this.ceils[i].pos.y);
                let type = 0;
                let roundType = [0, 0, 0, 0, 0, 0, 0, 0];
                try {
                    let ceilsData = MapDataComponent.instance.ceilsData;
                    let type = ceilsData[x][y];
                    for (let k = 0; k < 8; k++) {
                        roundType.push(ceilsData[x + GloableUtils.dx[i]][y + GloableUtils.dy[i]]);
                    }
                } catch{
                    Logger.error(`地形信息获取失败！(${x}, ${y})`, "MAPSYS");
                }
                this.ceils[i].dirty = false;
                this.ceils[i].uiDirty = this.ceils[i].ceil.Reset(type, roundType);
            }
        }
    }
}
