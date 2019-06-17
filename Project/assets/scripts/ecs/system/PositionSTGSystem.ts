import PositionComponent from "../component/PositionComponent";
import GraphicComponent from "../component/GraphicComponent";
import { EcsUtility } from "../utility/EcsUtility";
import NpcComponent from "../component/NpcComponent";
import { NpcTypeEnum } from "../../enum/NpcTypeEnum";
import MotionComponent from "../component/MotionComponent";

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
    @ECS.inject(MotionComponent)
    public motion: Array<MotionComponent>;

    public OnUpdate = function () {
        if (this.pos) {
            for (let i = 0; i < this.pos.length; i++) {
                if (this.pos[i].dirty == true && this.graphic[i].node) {
                    if (this.npc[i].npcAssets.npcType == NpcTypeEnum.player) {
                        this.graphic[i].node.position = this.pos[i].position.mul(EcsUtility.LogicToUIRatio);
                        // Logger.log(this.pos[i].position, "POS");
                    } else {
                        let v2 = this.pos[i].position.sub(this.graphic[i].node.position.div(EcsUtility.LogicToUIRatio)) as cc.Vec2;
                        let magSqr = v2.magSqr();
                        if (Math.abs(magSqr) > 0.01) {
                            v2 = v2.normalize();
                            let sequence = null;
                            if (magSqr < 5) {
                                let time = EcsUtility.NetWorkDeltaTime / 1000 * 2;
                                sequence = cc.moveBy(time, v2.mul(EcsUtility.LogicToUIRatio * time * this.motion[i].speed));
                            } else {
                                let time = EcsUtility.NetWorkDeltaTime / 1000;
                                sequence = cc.moveTo(time, this.pos[i].position.mul(EcsUtility.LogicToUIRatio));
                            }

                            this.graphic[i].node.stopAllActions();
                            this.graphic[i].node.runAction(sequence);
                        }
                    }
                    this.pos[i].dirty = false;
                }
            }
        }
    }
}