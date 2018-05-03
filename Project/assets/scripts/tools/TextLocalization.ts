import { EventEnum } from "../enum/EventEnum";
import { LocalizationManager } from "../manager/LocalizationManager";

const { ccclass, property } = cc._decorator;

/**
 * 文本本地化组件
 * 获取节点上的Text组件并将其内容替换为本地化脚本
 */
@ccclass
export default abstract class TextLocalization extends cc.Component {
    @property
    public key: string = "";

    private text: cc.Label | cc.RichText | cc.EditBox = null;

    onLoad() {
        this.text = this.node.getComponent<cc.Label>(cc.Label);
        if (this.text == null) {
            this.text = this.node.getComponent<cc.RichText>(cc.RichText);
        }
        if (this.text == null) {
            this.text = this.node.getComponent<cc.EditBox>(cc.EditBox);
        }
        this.refreshLocalization();
        this.node.on(EventEnum.RefreshLocalizationText, this.refreshLocalization);
    }

    onDestroy() {
        this.node.off(EventEnum.RefreshLocalizationText, this.refreshLocalization);
    }

    private refreshLocalization() {
        if (this.text != null) {
            if (this.text instanceof cc.EditBox) {
                let tText: cc.EditBox = this.text;
                tText.placeholder = LocalizationManager.Instance.GetLocalizationTextByKey(this.key);
            } else {
                this.text.string = LocalizationManager.Instance.GetLocalizationTextByKey(this.key);
            }
        }
    }
}