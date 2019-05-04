import UIProto from "../struct/UIProto";
import UISessionData from "../ecs/sharedComponent/UISessionDate";
import { UIProtoTypeEnum } from "../enum/UIProtoTypeEnum";
import { UIManager } from "./UIManager";
import { UINameEnum } from "../enum/UINameEnum";
import { ChooseRoleUI } from "../ui/chooseplayerui/ChooseRoleUI";
import { GloableUtils } from "../tools/GloableUtils";

/**
 * ui层使用的ui与ecs系统的会话管理类
 */
export class UI2EcsSessionManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new UI2EcsSessionManager();
    private constructor() { }

    public Init() {

    }

    public Send(proto: UIProto){
        UISessionData.instance.UI2ECSProtos.Enqueue(proto);
    }

    public Update(dt: number){
        while(UISessionData.instance.ECS2UIProtos.count > 0){
            let proto = UISessionData.instance.ECS2UIProtos.Dequeue();
            switch (proto.type){
                case UIProtoTypeEnum.RLT_ROLES:
                    this.RltGetRoles(proto);
                break;
                case UIProtoTypeEnum.RLT_ERROR_EVENT:
                    GloableUtils.ShowTips(proto.params[0] as string);
                break;
            }
        }
    }

    private RltGetRoles(proto: UIProto){
        let chooseRolesUI = UIManager.Instance.GetUI(UINameEnum.CHOOSE_ROLE_UI) as ChooseRoleUI;
        chooseRolesUI.Refresh(proto.params[0] as SimCivil.Contract.RoleSummary[]);
    }
}