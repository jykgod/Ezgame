import { NpcTypeEnum } from "../../enum/NpcTypeEnum";
import NpcAssets from "../../struct/NpcAssets";
import NpcComponent from "../component/NpcComponent";
import NpcAssetsData from "../sharedComponent/NpcAssetsData";
import PositionComponent from "../component/PositionComponent";
import GraphicComponent from "../component/GraphicComponent";
import HealthComponent from "../component/HealthComponent";
import MotionComponent from "../component/MotionComponent";
import MotionControllerComponent from "../component/MotionControllerComponent";
import DirectionComponent from "../component/DirectionComponent";
import PlayerAssetsData from "../sharedComponent/PlayerAssetsData";

//放一些公用的静态方法。
export class EcsUtility {
    // public static GotRole:boolean = false;
    public static RegisterViewSyncOpt: Promise<void>;
    public static InitedViewSyncSystem: boolean;
    public static LastSyncMotionTime: number;
    public static LastLocalMoveTime: number;
    public static LogicToUIRatio: number = 80;
    public static NetWorkDeltaTime: number = 300;
    public static SyncPositionDeltaTime: number = 100;//单位：ms，向服务器同步客户端位置的时间间隔

    /**
     * 添加一个npc的数据
     * @param entity npc的ecs实体
     * @param guid npc的服务器id
     * @param npcType npc的类型
     * @param roleSummary npc的角色概述信息
     * @param inspect npc的详细信息
     */
    public static AddNpcAsset(entity: number,
        guid: string,
        npcType: NpcTypeEnum = NpcTypeEnum.npc,
        roleSummary: SimCivil.Contract.RoleSummary,
        inspect?: SimCivil.Contract.InspectionResult): NpcAssets {
        let data = new NpcAssets(entity, guid, npcType);
        data.roleSummary = roleSummary;
        data.inspect = inspect;
        ECS.World.active.EntitisManager.addComponent(entity, NpcComponent);
        let npcComponent = ECS.World.active.EntitisManager.GetComponent(entity, NpcComponent) as NpcComponent;
        npcComponent.npcAssets = data;
        NpcAssetsData.instance.npcAssetsDict[guid] = data;
        return data;
    }

    /**
     * 添加一个npc
     * 
     */
    public static AddNpc(obj: SimCivil.Contract.EntityDto): number {
        //创建实体
        let entity = ECS.World.active.EntitisManager.CreateAEntity();
        //创建角色概览数据
        let roleSummery = new SimCivil.Contract.RoleSummary();
        roleSummery.Id = obj.Id;
        roleSummery.Name = obj.Name;
        let assets = EcsUtility.AddNpcAsset(entity, obj.Id, NpcTypeEnum.olPlayer, roleSummery);
        //添加位置组件和渲染组件
        ECS.World.active.EntitisManager.addComponent(entity,
            NpcComponent,
            PositionComponent,
            GraphicComponent,
            DirectionComponent,
            HealthComponent
        );
        let npcComp = ECS.World.active.EntitisManager.GetComponent(entity, NpcComponent) as NpcComponent;
        npcComp.npcAssets = assets;
        let healthComp = ECS.World.active.EntitisManager.GetComponent(entity, HealthComponent) as HealthComponent;
        healthComp.HP = obj.Hp;
        let posComp = ECS.World.active.EntitisManager.GetComponent(entity, PositionComponent) as PositionComponent;
        posComp.position = cc.v2(obj.Pos[0], obj.Pos[1]);
        return entity;
    }

    /**
     * 添加玩家
     */
    public static AddPlayer(): number {
        //创建实体
        let entity = ECS.World.active.EntitisManager.CreateAEntity();
        //创建角色概览数据
        let assets = EcsUtility.AddNpcAsset(entity, PlayerAssetsData.instance.Role.Id, NpcTypeEnum.player, PlayerAssetsData.instance.Role);
        //添加位置组件和渲染组件
        ECS.World.active.EntitisManager.addComponent(entity,
            MotionComponent,
            MotionControllerComponent,
            DirectionComponent,
            NpcComponent,
            PositionComponent,
            GraphicComponent,
            HealthComponent
        );
        let npcComp = ECS.World.active.EntitisManager.GetComponent(entity, NpcComponent) as NpcComponent;
        npcComp.npcAssets = assets;
        PlayerAssetsData.instance.npcAssets = assets;
        let healthComp = ECS.World.active.EntitisManager.GetComponent(entity, HealthComponent) as HealthComponent;
        healthComp.HP = 10;
        return entity;
    }
}