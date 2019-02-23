import UISessionData from "../sharedComponent/UISessionDate";
import { UIProtoTypeEnum } from "../../enum/UIProtoTypeEnum";
import RoleSystem from "./RoleSystem";
import UIProto from "../../struct/UIProto";

/**
 * 这个系统负责对UI层发过来的协议进行处理,系统本身不负责向UI层发送消息
 * */
export default class UISessionSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(UISessionData);
    }

    public OnDestroy(): void{
        ECS.World.active.EntitisManager.removeSharedComponent(UISessionData);
    }

    protected OnUpdate(): void {
        while(UISessionData.instance.UI2ECSProtos.count > 0){
            let proto = UISessionData.instance.UI2ECSProtos.Dequeue();
            switch(proto.type){
                case UIProtoTypeEnum.REQ_LOGIN:
                    ECS.World.active.addSystem(RoleSystem);
                break;
            }
        }
    }
}