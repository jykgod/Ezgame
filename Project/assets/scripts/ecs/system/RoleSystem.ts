import { EcsUtility } from "../utility/EcsUtility";
import PlayerAssetsData from "../sharedComponent/PlayerAssetsData";
import UISessionData from "../sharedComponent/UISessionDate";
import UIProto from "../../struct/UIProto";
import { UIProtoTypeEnum } from "../../enum/UIProtoTypeEnum";

/**
 * 负责维护玩家的角色列表
 */
export default class RoleSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(PlayerAssetsData);
        (async () => {
            PlayerAssetsData.instance.Roles = await SimCivil.Contract.IRoleManager.GetRoleList();
            UISessionData.instance.ECS2UIProtos.Enqueue(new UIProto(UIProtoTypeEnum.RLT_ROLES, PlayerAssetsData.instance.Roles));
        })();
        // let createRoleOption = new SimCivil.Contract.CreateRoleOption();
        // createRoleOption.Gender = SimCivil.Contract.Gender.male;
        // createRoleOption.Name = "jyk";
        // createRoleOption.Race = SimCivil.Contract.Race.human;
        // EcsUtility.GotRole = false;
        // (async () => {
        //     let success = await SimCivil.Contract.IRoleManager.CreateRole(createRoleOption);
        //     if (success == true) {
        //         Logger.log("CreateRole success！", "MovementTest");
        //     } else {
        //         Logger.log("CreateRole faild", "MovementTest");
        //     }
        //     EcsUtility.GotRole = await SimCivil.Contract.IRoleManager.UseRole((await SimCivil.Contract.IRoleManager.GetRoleList())[0].Id);
        //     if (EcsUtility.GotRole == true) {
        //         ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("Player"), (error, res) => {
        //             if (error) {
        //                 Logger.log(error.message);
        //                 return;
        //             }
        //             let node: cc.Node = cc.instantiate<cc.Node>(res);
        //             node.setParent(cc.Canvas.instance.node);
        //         });
        //     } else {
        //         Logger.log("UseRole faild", "MovementTest");
        //     }
        // })();
    }

    public OnDestroy(): void {
        // EcsUtility.GotRole = false;
        ECS.World.active.EntitisManager.removeSharedComponent(PlayerAssetsData);
    }

    protected OnUpdate(): void {
    }
}