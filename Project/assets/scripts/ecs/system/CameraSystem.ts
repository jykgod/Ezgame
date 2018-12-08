import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import MapDataComponent from "../sharedComponent/MapDataComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import PositionComponent from "../component/PositionComponent";
import { EcsUtility } from "../utility/EcsUtility";

export default class CameraSystem extends ECS.ComponentSystem {
    @ECS.inject(MotionControllerComponent)
    public motionControllers: Array<MotionControllerComponent>;
    @ECS.inject(PositionComponent)
    public positions: Array<PositionComponent>;

    public OnStart(): void {
        ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("GameCamera"), (error, res) => {
            if (error) {
                Logger.log(error.message);
                return;
            }
            let node: cc.Node = cc.instantiate<cc.Node>(res);
            node.setParent(cc.Canvas.instance.node);
            MapDataComponent.instance.cameraNode = node;
        });
    }

    public OnDestroy(): void {
        MapDataComponent.instance.cameraNode.destroy();
        MapDataComponent.instance.cameraNode = null;
    }

    protected OnUpdate(): void {
        if (this.positions.length <= 0) return;
        let playerPos = cc.Vec2.ZERO;
        for (let i = 0; i < this.positions.length; i++) {
            playerPos.addSelf(this.positions[i].position);
        }
        playerPos.divSelf(this.positions.length);
        let temp = playerPos.clone();
        temp.subSelf(MapDataComponent.instance.centerPosition);
        let mag = temp.mag();
        // Logger.log(`mag = ${mag}`, "cameraSystem");
        if(mag * EcsUtility.LogicToUIRatio > 100){
            temp.mulSelf(100 / (mag * EcsUtility.LogicToUIRatio));
            temp = playerPos.sub(temp);
            if(temp != MapDataComponent.instance.centerPosition){
                MapDataComponent.instance.centerPositionDirty = true;
                MapDataComponent.instance.centerPosition = temp;
                MapDataComponent.instance.cameraNode.position = MapDataComponent.instance.centerPosition.mul(EcsUtility.LogicToUIRatio);
            }
        }
    }
}