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
    }

    public OnDestroy(): void {
        // EcsUtility.GotRole = false;
        ECS.World.active.EntitisManager.removeSharedComponent(PlayerAssetsData);
    }

    protected OnUpdate = function(): void {
        if (UISessionData.instance.UI2ECSProtos.count > 0 &&
            UISessionData.instance.UI2ECSProtos.first.type == UIProtoTypeEnum.REQ_CREATE_ROLE) {
            let proto = UISessionData.instance.UI2ECSProtos.Dequeue();
            let createRoleOption = proto.params[0] as SimCivil.Contract.CreateRoleOption;
            Logger.info(createRoleOption);
            this.CeateRole(createRoleOption);
        }
    }

    private async CeateRole(option: SimCivil.Contract.CreateRoleOption): Promise<void> {
        let success = await SimCivil.Contract.IRoleManager.CreateRole(option);
        if (success) {
            PlayerAssetsData.instance.Roles = await SimCivil.Contract.IRoleManager.GetRoleList();
            UISessionData.instance.ECS2UIProtos.Enqueue(new UIProto(UIProtoTypeEnum.RLT_ROLES, PlayerAssetsData.instance.Roles));
        } else {
            UISessionData.instance.ECS2UIProtos.Enqueue(new UIProto(UIProtoTypeEnum.RLT_ERROR_EVENT, LocalizationManager.Instance.GetLocalizationTextByKey("create_role_error")));
        }
    }
}