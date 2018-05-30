import { EditableComponentUI } from "../editableui/EditableComponentUI";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainUIEquipComponent extends EditableComponentUI {
    private itemID: number;
    private sprEquip: cc.Sprite;
    private txtName: cc.Label;

    public init(itemID: number):void{
        this.itemID = itemID;
        this.sprEquip = this.node.getChildByName("equip").getComponent(cc.Sprite);
        this.txtName = this.node.getChildByName("name").getComponent(cc.Label);
    }
}
