import UIBase from "../UIBase";
import { GloableUtils } from "../../tools/GloableUtils";
import { UINameEnum } from "../../enum/UINameEnum";
import { EditableCompnentUIConfigure } from "./EditableCompnentUIConfigure";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { UIManager } from "../../manager/UIManager";

const { ccclass, property } = cc._decorator;
/**
 * 可编辑的UI组件
 */
@ccclass
export abstract class EditableComponentUI extends cc.Component {
    @property
    public uiname: string = '';

    private key: string;
    private conf: EditableCompnentUIConfigure;

    /**
     * 通过配置文件加载可编辑组件
     * @param key 可编辑组件的配置文件键值
     * @param callback 加载完成后的回调
     */
    public static LoadEditableComponentUI(key: string, callback: (ui: EditableComponentUI) => void) {
        var conf = LocalStorageUtils.loadStorageObject<EditableCompnentUIConfigure>(key);
        cc.loader.loadRes(GloableConstantUtils.UIPrefabPath.concat(conf.name), (error, res) => {
            if (error != null) {
                Logger.error(`load res error key:${key}`, 'EditableComponent');
                if(callback != null){
                    callback(null);
                }
                return;
            }

            let node = cc.instantiate<cc.Node>(res);
            let ui = node.getComponent (EditableComponentUI);
            ui.resetUIStateByConfig();
            callback(ui);
        });
    }

    /**
     * 通过配置文件加载可编辑组件
     * @param key 可编辑组件的配置文件键值
     * @param callback 加载完成后的回调
     */
    public static CreateEditableComponentUI(father: cc.Node, uiname: string, callback: (ui: EditableComponentUI) => void) {
        
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
       // this.conf.parentNodePath = this.node.parent;
        this.conf.scale =this.node.scale;
        this.conf.pos = this.node.position;
        this.conf.Save();
    }

    /**
     * 根据配置重新摆放UI的位置
     */
    public resetUIStateByConfig() {
        let father = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        if(father == null || father == undefined) {
            return;
        }
        this.node.parent = father.node;
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