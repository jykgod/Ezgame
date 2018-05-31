import UIBase from "../UIBase";
import { GloableUtils } from "../../tools/GloableUtils";
import { UINameEnum } from "../../enum/UINameEnum";
import { EditableComponentUIConfigure } from "./EditableComponentUIConfigure";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum";
import { UIManager } from "../../manager/UIManager";
import { EditableComponentUIManager } from "../../manager/EditableComponentUIManager";

const { ccclass, property } = cc._decorator;
/**
 * 可编辑的UI组件
 */
@ccclass
export abstract class EditableComponentUI extends cc.Component {

    private key: string;
    private conf: EditableComponentUIConfigure;
    private fatherUI: UIBase;
    /**
     * 取消编辑
     */
    protected cancel() {
        this.ResetUIStateByConfig();
    }
    /**
     * 保存编辑
     */
    protected save() {
        if (this.fatherUI == null || this.fatherUI == undefined) return;
        let father = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        this.conf.parentNodePath = GloableUtils.GetNodePath(this.fatherUI.node, this.node);
        this.conf.scale = this.node.scale;
        this.conf.pos = this.node.position;
        this.conf.Save();
    }
    /**
     * 克隆出一个一样的UI
     */
    protected clone(callback: (ui: EditableComponentUI) => void) {
        let editableCount = LocalStorageUtils.getNumber(LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
        LocalStorageUtils.setNumber(LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
        var conf = this.conf.clone(LocalStorageEnum.EDITABLE_UI_COUNT.concat(editableCount.toString()));
        conf.Save();
        EditableComponentUIManager.Instance.LoadEditableComponentUI(conf.Key, callback);
    }
    /**
     * 根据配置重新摆放UI的位置
     */
    public ResetUIStateByConfig() {
        this.fatherUI = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        if (this.fatherUI == null || this.fatherUI == undefined) {
            return;
        }
        this.node.parent = cc.find(this.conf.parentNodePath, this.fatherUI.node);
        this.node.scale = this.conf.scale;
        this.node.position = this.conf.pos;
    }
}