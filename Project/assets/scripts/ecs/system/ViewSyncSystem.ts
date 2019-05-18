import { EcsUtility } from "../utility/EcsUtility";
import ViewChangeData from "../sharedComponent/ViewChangeData";
import { GloableUtils } from "../../tools/GloableUtils";
import PositionComponent from "../component/PositionComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import MotionComponent from "../component/MotionComponent";
import MapDataComponent from "../sharedComponent/MapDataComponent";
import NpcAssetsData from "../sharedComponent/NpcAssetsData";

/**
 * 视野同步系统
 */
export default class ViewSyncSystem extends ECS.ComponentSystem {

    @ECS.inject(MotionComponent)
    public motions: Array<MotionComponent>;
    @ECS.inject(PositionComponent)
    public positions: Array<PositionComponent>;
    @ECS.inject(MotionControllerComponent)
    public motionController: Array<MotionControllerComponent>;

    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(ViewChangeData);
        ECS.World.active.EntitisManager.addSharedComponent(NpcAssetsData);

        ViewChangeData.instance.data = null;
        ViewChangeData.instance.gotData = false;
        EcsUtility.InitedViewSyncSystem = false;
        EcsUtility.RegisterViewSyncOpt = (async () => {
            await SimCivil.Contract.IViewSynchronizer.RegisterViewSync((viewChanged) => {
                ViewChangeData.instance.data = viewChanged;
                 Logger.log(viewChanged);
            });
            EcsUtility.InitedViewSyncSystem = true;
        })();
    }

    public OnDestroy(): void {
        ECS.World.active.EntitisManager.removeSharedComponent(ViewChangeData);
        (async () => {
            await SimCivil.Contract.IViewSynchronizer.DeregisterViewSync();
        });
        EcsUtility.InitedViewSyncSystem = false;
    }

    protected OnUpdate(): void {
        if (ViewChangeData.instance.data != null && this.positions != null && this.positions.length > 0) {
            let pos = new cc.Vec2(ViewChangeData.instance.data.Position[0], ViewChangeData.instance.data.Position[1]);
            // Logger.log(this.positions[0].position);
            // Logger.log(pos);
            if (this.positions[0].position.sub(pos).magSqr() > 1 || ViewChangeData.instance.gotData == false) {
                Logger.log(`出现客户端和服务器位置不同步的问题！客户端位置:${this.positions[0].position} ; 服务器位置:${pos};`, "ViewChange");
                Logger.info(ViewChangeData.instance.data);
                EcsUtility.LastSyncMotionTime = TimeManager.Instance.GetCurrentServerTIme();
                if (ViewChangeData.instance.gotData == false) {
                    ViewChangeData.instance.gotData = true;
                    let count = 0;
                    let nowx = 0;
                    let nowy = 0;
                    SimCivil.Contract.IViewSynchronizer.GetAtlas([nowx, nowy]).then((v) => {
                        // Logger.log("nextX:" + nowx + ";nextY:" + nowy + ";");
                        // Logger.info(v);
                        if (!v) return;
                        MapDataComponent.instance.ceilsFromServer = MapDataComponent.instance.ceilsFromServer.concat(v);
                        count++;
                        if (count == 9) {
                            Logger.info("overed");
                            MapDataComponent.instance.centerPositionDirty = true;
                        }
                    });
                    for (let i = 0; i < 8; i++) {
                        let nextX = nowx + GloableUtils.dx[i];
                        let nextY = nowy + GloableUtils.dy[i];
                        SimCivil.Contract.IViewSynchronizer.GetAtlas([nowx + GloableUtils.dx[i], nowy + GloableUtils.dy[i]]).then((v) => {
                            // Logger.log("nextX:" + nextX + ";nextY:" + nextY + ";");
                            // Logger.info(v);
                            if (!v) return;
                            MapDataComponent.instance.ceilsFromServer = MapDataComponent.instance.ceilsFromServer.concat(v);
                            count++;
                            if (count == 9) {
                                Logger.info("overed");
                                MapDataComponent.instance.centerPositionDirty = true;
                            }
                        });
                    }
                }
                this.positions[0].position = pos;
                this.motions[0].speed = ViewChangeData.instance.data.Speed;

            }
        }
    }
}