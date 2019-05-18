import NpcAssets from "../../struct/NpcAssets";
//所有角色的资产数据
export default class NpcAssetsData implements ECS.ISharedComponentData {
    public static instance: NpcAssetsData;
    public npcAssetsDict: { [key: string]: NpcAssets; } = {};
}