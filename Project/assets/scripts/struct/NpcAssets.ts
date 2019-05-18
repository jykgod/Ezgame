import { NpcTypeEnum } from "../enum/NpcTypeEnum";
//Npc资产数据
export default class NpcAssets {
    public npcType: NpcTypeEnum;
    guid: string;
    roleSummary: SimCivil.Contract.RoleSummary;
    inspect: SimCivil.Contract.InspectionResult;
    entity: number;

    constructor(entity: number, guid: string, npcType: NpcTypeEnum = NpcTypeEnum.npc){
        this.guid = guid;
        this.entity = entity;
        this.npcType = npcType;
        this.inspect = null;
        this.roleSummary = null;
    }
}