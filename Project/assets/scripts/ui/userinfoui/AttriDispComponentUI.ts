import { LocalizationManager } from "../../manager/LocalizationManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AttriDispComponentUI extends cc.Component {
    @property(cc.Label)
    public NameLabel: cc.Label;
    @property(cc.Label)
    public ValueLabel: cc.Label;

    public SetValue(nameKey: string, value: string) {
        this.NameLabel.string = LocalizationManager.Instance.GetLocalizationTextByKey(nameKey) + ":";
        this.NameLabel._updateRenderData(true);
        this.ValueLabel.string = value;
        this.ValueLabel.node.position = cc.v2(this.NameLabel.node.getContentSize().width + 5, 0);
    }
}
