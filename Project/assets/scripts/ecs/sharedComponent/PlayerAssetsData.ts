import NpcAssets from "../../struct/NpcAssets";

//用户自己的资产数据
export default class PlayerAssetsData implements ECS.ISharedComponentData{
    public static instance: PlayerAssetsData;

    public Roles: SimCivil.Contract.RoleSummary[];
    public Role: SimCivil.Contract.RoleSummary;

    public npcAssets: NpcAssets;
}