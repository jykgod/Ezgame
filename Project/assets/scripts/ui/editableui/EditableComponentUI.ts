import UIBase from "../UIBase";
import { GloableUtils } from "../../tools/GloableUtils";
import { UINameEnum } from "../../enum/UINameEnum";
import { EditableCompnentUIConfigure } from "./EditableCompnentUIConfigure";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { UIManager } from "../../manager/UIManager";
import { ComponentUINameEnum } from "../../enum/ComponentUINameEnum";

const { ccclass, property } = cc._decorator;
/**
 * 可编辑的UI组件
 */
@ccclass
export abstract class EditableComponentUI extends cc.Component {

    private key: string;
    private conf: EditableCompnentUIConfigure;
    private fatherUI: UIBase;

    /**
     * 通过配置文件加载可编辑组件
     * @param key 可编辑组件的配置文件键值
     * @param callback 加载完成后的回调
     */
    public static LoadEditableComponentUI(key: string, callback: (ui: EditableComponentUI) => void) {
        var conf = LocalStorageUtils.loadStorageObject<EditableCompnentUIConfigure>(key);
        cc.loader.loadRes(GloableConstantUtils.UIPrefabPath.concat(conf.uiname.toString()), (error, res) => {
            if (error != null) {
                Logger.error(`load res error key:${key}`, 'EditableComponent');
                if (callback != null) {
                    callback(null);
                }
                return;
            }

            let node = cc.instantiate<cc.Node>(res);
            let ui = node.getComponent(EditableComponentUI);
            ui.resetUIStateByConfig();
            callback(ui);
        });
    }

    /**
     * 通过配置文件加载可编辑组件
     * @param fatherUI 可编辑组件父级UI的名字
     * @param fatherNode 可编辑组件挂载的父节点
     * @param componentName 可编辑组件的名字(和prefab名字相同)
     * @param callback 加载完成后的回调
     */
    public static CreateEditableComponentUI(fatherUI: UINameEnum, fatherNode: string, componentName: ComponentUINameEnum, callback: (ui: EditableComponentUI) => void) {

    }

    /**
     * 取消编辑
     */
    protected cancel() {

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
     * 根据配置重新摆放UI的位置
     */
    public resetUIStateByConfig() {
        this.fatherUI = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        if (this.fatherUI == null || this.fatherUI == undefined) {
            return;
        }
        this.node.parent = cc.find(this.conf.parentNodePath, this.fatherUI.node);
        this.node.scale = this.conf.scale;
        this.node.position = this.conf.pos;
    }
    /**
     * 克隆出一个一样的UI
     */
    protected clone(callback: (ui: EditableComponentUI) => void) {
        let editableCount = LocalStorageUtils.getNumber(LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
        LocalStorageUtils.setNumber(LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
        var conf = this.conf.clone(LocalStorageEnum.EDITABLE_UI_COUNT.concat(editableCount.toString()));
        conf.Save();
        EditableComponentUI.LoadEditableComponentUI(conf.Key, callback);
    }
}