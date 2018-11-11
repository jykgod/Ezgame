import MotionComponent from "../../ecs/component/MotionComponent";
import PositionComponent from "../../ecs/component/PositionComponent";
import MotionControllerComponent from "../../ecs/component/MotionControllerComponent";
import DirectionComponent from "../../ecs/component/DirectionComponent";
import Npc from "./Npc";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends Npc {
    private posComp: PositionComponent;

    start() {
        this._entity = ECS.World.active.EntitisManager.CreateAEntity();
        ECS.World.active.EntitisManager.addComponent(
            this._entity,
            MotionComponent,
            PositionComponent,
            MotionControllerComponent,
            DirectionComponent);
        Logger.log("add player");
        this.posComp = <PositionComponent>ECS.World.active.EntitisManager.GetComponent(this._entity, PositionComponent);
    }

    update(){
        this.node.position = this.posComp.position.mul(10);
    }
}
