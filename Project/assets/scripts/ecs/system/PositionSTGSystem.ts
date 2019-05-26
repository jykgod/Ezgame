import PositionComponent from "../component/PositionComponent";
import GraphicComponent from "../component/GraphicComponent";
import { EcsUtility } from "../utility/EcsUtility";

/**
 * 将实体位置信息同步到渲染节点上面的组件
 * STG:Sync To Graphics
 */
export default class PositionSTGSystem extends ECS.ComponentSystem {
    @ECS.inject(PositionComponent)
    public pos: Array<PositionComponent>;
    @ECS.inject(GraphicComponent)
    public graphic: Array<GraphicComponent>;

    public OnUpdate = function () {
        if (this.pos) {
            for (let i = 0; i < this.pos.length; i++) {
                if (this.pos[i].dirty == true && this.graphic[i].node) {
                    this.graphic[i].node.position = this.pos[i].position.mul(EcsUtility.LogicToUIRatio);
                    this.pos[i].dirty = false;
                    Logger.log(this.pos[i].position, "POS");
                }
            }
        }
    }
}