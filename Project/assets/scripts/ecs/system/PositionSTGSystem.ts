import PositionComponent from "../component/PositionComponent";
import GraphicComponent from "../component/GraphicComponent";
import { EcsUtility } from "../utility/EcsUtility";
import NpcComponent from "../component/NpcComponent";
import { NpcTypeEnum } from "../../enum/NpcTypeEnum";

/**
 * 将NPC位置信息同步到渲染节点上面的组件
 * STG:Sync To Graphics
 */
export default class PositionSTGSystem extends ECS.ComponentSystem {
    @ECS.inject(NpcComponent)
    public npc: Array<NpcComponent>;
    @ECS.inject(PositionComponent)
    public pos: Array<PositionComponent>;
    @ECS.inject(GraphicComponent)
    public graphic: Array<GraphicComponent>;

    public OnUpdate = function () {
        if (this.pos) {
            for (let i = 0; i < this.pos.length; i++) {
                if (this.pos[i].dirty == true && this.graphic[i].node) {
                    if (this.npc[i].npcAssets.npcType == NpcTypeEnum.player) {
                        this.graphic[i].node.position = this.pos[i].position.mul(EcsUtility.LogicToUIRatio);
                    } else {
                        let v2 = this.pos[i].position.mul(EcsUtility.LogicToUIRatio).sub(this.graphic[i].node.position) as cc.Vec2;
                        let sequence = null;
                        if (v2.magSqr() < 5) {
                            sequence = cc.moveBy(EcsUtility.NetWorkDeltaTime / 1000 * 10, v2.mul(10));
                        } else {
                            sequence = cc.moveTo(EcsUtility.NetWorkDeltaTime / 1000, this.pos[i].position.mul(EcsUtility.LogicToUIRatio));
                        }

                        this.graphic[i].node.stopAllActions();
                        this.graphic[i].node.runAction(sequence);
                    }
                    this.pos[i].dirty = false;
                }
            }
        }
    }
}