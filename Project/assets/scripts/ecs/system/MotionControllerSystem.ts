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
        if(this.entities == null){
            return;
        }
        let inputData = InputData.instance;
        for (let i = 0; i < this.entities.length; i++) {
            if(this.motions[i].canMove == true){
                switch (this.motionController[i].type){
                    //case xxx:....
                    default:
                        this.directions[i].direction = cc.Vec2.ZERO;
                        if(inputData.right) this.directions[i].direction.x += 1;
                        if(inputData.left) this.directions[i].direction.x -= 1;
                        if(inputData.up) {this.directions[i].direction.y += 1;Logger.log(JSON.stringify(inputData));}
                        if(inputData.down) this.directions[i].direction.y -= 1;
                        this.directions[i].direction.normalizeSelf();
                }
                this.motions[i].v = this.directions[i].direction.mul(this.motions[i].speed);
                // Logger.log(this.motions[i].v.mag(), "direct");
            }
        }
    }
}