import MotionComponent from "../component/MotionComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import PositionComponent from "../component/PositionComponent";
import { EcsUtility } from "../utility/EcsUtility";

/**
 * 更新玩家位置信息
 * 并与服务器同步玩家位置信息
 */
export default class PlayerMotionSyncSystem extends ECS.ComponentSystem {
    @ECS.inject(PositionComponent)
    public pos: Array<PositionComponent>;
    @ECS.inject(MotionComponent)
    public motion: Array<MotionComponent>;
    @ECS.inject(MotionControllerComponent)
    public controller: Array<MotionControllerComponent>;

    public OnStart(): void {
        EcsUtility.LastSyncMotionTime = new Date();
    }

    protected OnUpdate(): void {
        let now = new Date();
        if (this.motion.length > 0) {
            let motionV = this.motion[0].v.mul((now - EcsUtility.LastSyncMotionTime) / 1000);
            this.pos[0].position = this.pos[0].position.add(motionV);
            // Logger.log(`(${motionV.x},${motionV.y})`, "PlayerMotionSyncSystem");
            // Logger.log((now - this.lastTime) / 1000, "PlayerMotionSyncSystem");
            // Logger.log(motionV.mag(), "PlayerMotionSyncSystem");
            SimCivil.Contract.IPlayerController.MoveTo(new SimCivil.Contract.ValueTupleFloat({ Item1: this.pos[0].position.x, Item2: this.pos[0].position.y }), now);
        }
        EcsUtility.LastSyncMotionTime = now;
    }
}