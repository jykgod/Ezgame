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
        EcsUtility.LastSyncMotionTime = TimeManager.Instance.GetCurrentServerTIme();
    }

    protected OnUpdate(): void {
        let now = TimeManager.Instance.GetCurrentServerTIme();
        for (let i = 0; i < this.motion.length; i++) {
            // Logger.log(`(${motionV.x},${motionV.y})`, "PlayerMotionSyncSystem");
            // Logger.log((now - this.lastTime) / 1000, "PlayerMotionSyncSystem");
            // Logger.log(motionV.mag(), "PlayerMotionSyncSystem");
            if(this.motion[i].v.magSqr() > 0){
                Logger.log(this.motion[i].v);
                let motionV = this.motion[i].v.mul((now - EcsUtility.LastSyncMotionTime) / 1000);
                this.pos[i].position = this.pos[i].position.add(motionV);
                SimCivil.Contract.IPlayerController.MoveTo([this.pos[i].position.x, this.pos[i].position.y], now);
            }
        }
        EcsUtility.LastSyncMotionTime = now;
    }
}