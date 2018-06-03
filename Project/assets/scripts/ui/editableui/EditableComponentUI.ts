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
export class EditableComponentUI extends cc.Component {
    /**
     * key
     */
    public get Key(): string {
        if (this.conf == null) return null;
        return this.conf.Key;
    }
    /**
     * 父ui
     */
    private fatherUI: UIBase;
    /**
     * 存放在客户端本地的配置
     */
    protected conf: EditableComponentUIConfigure;
    /**
     * 取消编辑
     */
    protected cancel() {
        this.resetUIStateByConfig();
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
        var conf = this.conf.clone(LocalStorageEnum.EDITABLE_UI_PREFIX.concat(editableCount.toString()));
        conf.Save();
        EditableComponentUIManager.Instance.LoadEditableComponentUI(conf.Key, callback);
    }
    /**
     * 根据配置重新摆放UI的位置
     */
    public resetUIStateByConfig() {
        this.fatherUI = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        if (this.fatherUI == null || this.fatherUI == undefined) {
            return false;
        }
        this.node.parent = cc.find(this.conf.parentNodePath, this.fatherUI.node);
        this.node.scale = this.conf.scale;
        this.node.position = this.conf.pos;
        return true;
    }

    public set Conf(conf: EditableComponentUIConfigure){
        this.conf = conf;
    }

    public show(data: object) {

    }

    public delate(){

    }

    public hide() {

    }
}