import { NpcTypeEnum } from "../../enum/NpcTypeEnum";
import NpcAssets from "../../struct/NpcAssets";
import NpcComponent from "../component/NpcComponent";
import NpcAssetsData from "../sharedComponent/NpcAssetsData";

//放一些公用的静态方法。
export class EcsUtility{
    // public static GotRole:boolean = false;
    public static RegisterViewSyncOpt:Promise<void>;
    public static InitedViewSyncSystem:boolean;
    public static LastSyncMotionTime:number;
    public static LogicToUIRatio:number = 80;

    /**
     * 添加一个npc
     * @param entity npc的ecs实体
     * @param guid npc的服务器id
     * @param npcType npc的类型
     * @param roleSummary npc的角色概述信息
     * @param inspect npc的详细信息
     */
    public static AddNpc(entity:number, 
        guid: string,
        npcType: NpcTypeEnum = NpcTypeEnum.npc, 
        roleSummary: SimCivil.Contract.RoleSummary,
        inspect?: SimCivil.Contract.InspectionResult): NpcAssets{
            let data = new NpcAssets(entity, guid, npcType);
            data.roleSummary = roleSummary;
            data.inspect = inspect;
            ECS.World.active.EntitisManager.addComponent(entity, NpcComponent);
            let npcComponent = ECS.World.active.EntitisManager.GetComponent(entity, NpcComponent) as NpcComponent;
            npcComponent.npcAssets = data;
            NpcAssetsData.instance.npcAssetsDict[guid] = data;
            return data;
    }
}