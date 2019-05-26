import MotionComponent from "../../ecs/component/MotionComponent";
import PositionComponent from "../../ecs/component/PositionComponent";
import MotionControllerComponent from "../../ecs/component/MotionControllerComponent";
import DirectionComponent from "../../ecs/component/DirectionComponent";
import Npc from "./Npc";
import { EcsUtility } from "../../ecs/utility/EcsUtility";
import Avatar from "./Avatar";
import PlayerAssetsData from "../../ecs/sharedComponent/PlayerAssetsData";
import { NpcTypeEnum } from "../../enum/NpcTypeEnum";

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
    private avatar: Avatar;

    async start() {
        // this._entity = ECS.World.active.EntitisManager.CreateAEntity();
        // ECS.World.active.EntitisManager.addComponent(
        //     this._entity,
        //     MotionComponent,
        //     PositionComponent,
        //     MotionControllerComponent,
        //     DirectionComponent);
        // this.posComp = <PositionComponent>ECS.World.active.EntitisManager.GetComponent(this._entity, PositionComponent);
        this.avatar = new Avatar(this.node);
        await this.avatar.load();
        // let inspect = await SimCivil.Contract.IPlayerController.Inspect(PlayerAssetsData.instance.Role.Id);
        // PlayerAssetsData.instance.npcAssets = 
        // EcsUtility.AddNpcAsset(this._entity, PlayerAssetsData.instance.Role.Id, NpcTypeEnum.player, PlayerAssetsData.instance.Role, inspect);
    }
}
