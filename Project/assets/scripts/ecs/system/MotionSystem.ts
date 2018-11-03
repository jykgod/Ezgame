import Direction from "../component/Direction";
import Motion from "../component/Motion";

export default class MotionSystem extends ECS.ComponentSystem {
    protected OnUpdate(): void {
        let entities = ECS.World.active.EntitisManager.GetEntities(Direction, Motion);
    }
}