import NpcAssets from "../../struct/NpcAssets";

/**
 * Npc组件
 * 主要用来区分角色类实体的具体类型
 * 存储一些可以统合在一起的数据，避免新建大量的component
 */
export default class NpcComponent implements ECS.IComponentData {
    public npcAssets: NpcAssets;
    public dirty: boolean;
}