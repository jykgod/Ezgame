import MotionComponent from "../component/MotionComponent";
import DirectionComponent from "../component/DirectionComponent";
import InputData from "../sharedComponent/InputData";
import MotionControllerComponent from "../component/MotionControllerComponent";

/**
 * 控制对实体当前帧速度和方向的改变
 */
export default class MotionControllerSystem extends ECS.ComponentSystem {

    @ECS.inject(DirectionComponent)
    public directions: Array<DirectionComponent>;
    @ECS.inject(MotionComponent)
    public motions: Array<MotionComponent>;
    @ECS.inject(MotionControllerComponent)
    public motionController: Array<MotionControllerComponent>;

    protected OnUpdate(): void {
        let inputData = InputData.instance;
        for (let i = 0; i < this.entities.length; i++) {
            if(this.motions[i].canMove == true){
                switch (this.motionController[i].type){
                    //case xxx:....
                    default:
                        this.directions[i].direction = cc.Vec2.ZERO;
                        this.directions[i].direction.x = (inputData.right && 1) + (inputData.left && -1);
                        this.directions[i].direction.y = (inputData.up && 1) + (inputData.down && -1);
                        this.directions[i].direction.normalizeSelf();
                }
                this.motions[i].v = this.directions[i].direction.mul(this.motions[i].speed);
            }
        }
    }
}