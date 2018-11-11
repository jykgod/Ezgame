import { EcsUtility } from "../utility/EcsUtility";
import ViewChangeData from "../sharedComponent/ViewChangeData";
import { GloableUtils } from "../../tools/GloableUtils";
import PositionComponent from "../component/PositionComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import MotionComponent from "../component/MotionComponent";

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
        EcsUtility.InitedViewSyncSystem = false;
        EcsUtility.RegisterViewSyncOpt = (async () => {
            while (EcsUtility.GotRole == false) {
                await GloableUtils.Delay(500);
            }
            await SimCivil.Contract.IViewSynchronizer.RegisterViewSync((viewChanged) => {
                ViewChangeData.instance.data = viewChanged;
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
        if(ViewChangeData.instance.data != null && this.positions != null && this.positions.length > 0){
            this.positions[0].position = new cc.Vec2(ViewChangeData.instance.data.Position.Item1, ViewChangeData.instance.data.Position.Item2);
            this.motions[0].speed = ViewChangeData.instance.data.Speed;
        }
    }
}