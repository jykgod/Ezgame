import MotionComponent from "../component/MotionComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import PositionComponent from "../component/PositionComponent";

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

    private lastTime: number;

    public OnStart(): void{
        this.lastTime = TimeManager.Instance.realTimeSinceStartScene;
    }

    protected OnUpdate(): void {
        if(this.motion.length > 0){
            this.pos[0].position = this.pos[0].position.add(this.motion[0].v.mul(TimeManager.Instance.realTimeSinceStartScene - this.lastTime));
            SimCivil.Contract.IPlayerController.MoveTo(new SimCivil.Contract.ValueTuple({ Item1: this.pos[0].position.x, Item2: this.pos[0].position.y }), new Date());
        }
        this.lastTime = TimeManager.Instance.realTimeSinceStartScene;
    }
}