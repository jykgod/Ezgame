import { EditableComponentUI } from "../editableui/EditableComponentUI";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIEquipComponent extends EditableComponentUI {
    private itemID: number;
    private sprEquip: cc.Sprite;
    private txtName: cc.Label;

    private priRefresh(itemID: number): void{
        this.itemID = itemID;
    }

    public pubRefresh(itemID: number): void {
        this.itemID = itemID;
        this.conf.data = {'itemID': itemID};
        this.conf.Save();
    }

    show(data) {
        this.sprEquip = this.node.getChildByName("equip").getComponent(cc.Sprite);
        this.txtName = this.node.getChildByName("name").getComponent(cc.Label);
        if (data == null) return;
        this.priRefresh(data.itemID);
    }
}
