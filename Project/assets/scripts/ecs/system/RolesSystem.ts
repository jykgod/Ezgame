import PlayerAssetsData from "../sharedComponent/PlayerAssetsData";
import UISessionData from "../sharedComponent/UISessionDate";
import UIProto from "../../struct/UIProto";
import { UIProtoTypeEnum } from "../../enum/UIProtoTypeEnum";
import { LocalizationManager } from "../../manager/LocalizationManager";

/**
 * 负责维护玩家的角色列表
 */
export default class RolesSystem extends ECS.ComponentSystem {
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
        if (UISessionData.instance.UI2ECSProtos.count > 0 &&
            UISessionData.instance.UI2ECSProtos.first.type == UIProtoTypeEnum.REQ_CREATE_ROLE) {
            let proto = UISessionData.instance.UI2ECSProtos.Dequeue();
            let createRoleOption = proto.params[0] as SimCivil.Contract.CreateRoleOption;
            (async () => {
                let success = await SimCivil.Contract.IRoleManager.CreateRole(createRoleOption);
                if (success) {
                    PlayerAssetsData.instance.Roles = await SimCivil.Contract.IRoleManager.GetRoleList();
                    UISessionData.instance.ECS2UIProtos.Enqueue(new UIProto(UIProtoTypeEnum.RLT_ROLES, PlayerAssetsData.instance.Roles));
                } else {
                    UISessionData.instance.ECS2UIProtos.Enqueue(new UIProto(UIProtoTypeEnum.RLT_ERROR_EVENT, LocalizationManager.Instance.GetLocalizationTextByKey("create_role_error")));
                }
            })();

        }
    }
}