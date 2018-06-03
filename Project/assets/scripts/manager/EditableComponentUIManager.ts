import { EditableComponentUI } from "../ui/editableui/EditableComponentUI";
import { EditableComponentUIConfigure } from "../ui/editableui/EditableComponentUIConfigure";
import { GloableConstantUtils } from "../tools/GloableConstantUtils";
import { UINameEnum } from "../enum/UINameEnum";
import { ComponentUINameEnum } from "../enum/ComponentUINameEnum";
import { LocalStorageEnum } from "../enum/LocalStorageEnum";
import { UIManager } from "./UIManager";
import { GloableUtils } from "../tools/GloableUtils";

/**
 * 可编辑UI组件管理类
 */
export class EditableComponentUIManager {
    /**
     * 单例声明
     */
    public static readonly Instance = new EditableComponentUIManager();
    private constructor() {

    }

    /**
     * 通过配置文件加载可编辑组件
     * @param key 可编辑组件的配置文件键值
     * @param callback 加载完成后的回调
     */
    public LoadEditableComponentUI(key: string, callback: (ui: EditableComponentUI) => void) {
        var conf = LocalStorageUtils.loadStorageObject<EditableComponentUIConfigure>(key);
        Logger.info(conf);
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
            ui.Conf = conf;
            if (ui.resetUIStateByConfig() == true) {
                ui.show(conf.data);
                callback(ui);
            } else {
                ui.node.destroy();
                if (callback != null) {
                    callback(null);
                }
            }
        });
    }

    /**
     * 通过UI名字加载可编辑组件
     * @param fatherUI 可编辑组件父级UI的名字
     * @param fatherNode 可编辑组件挂载的父节点
     * @param componentName 可编辑组件的名字(和prefab名字相同)
     * @param callback 加载完成后的回调
     */
    public CreateEditableComponentUI(fatherUI: UINameEnum, fatherNode: cc.Node, componentName: ComponentUINameEnum, callback: (ui: EditableComponentUI) => void) {
        let fUI = UIManager.Instance.GetUI(fatherUI);
        if (fUI == null || fUI == undefined) {
            Logger.log('父UI为空', `CreateEditableComponentUI ${fatherUI} ${fatherNode} ${componentName}`);
            if (callback != null) {
                callback(null);
            }
            return;
        }
        let path = GloableUtils.GetNodePath(fUI.node, fatherNode);
        if (path == null) {
            Logger.log('找不到父节点', 'CreateEditableComponentUI');
            if (callback != null) {
                callback(null);
            }
            return;
        }
        cc.loader.loadRes(GloableConstantUtils.UIPrefabPath.concat(componentName.toString()), (error, res) => {
            if (error != null) {
                Logger.error(`load res error key:${componentName}`, 'EditableComponent');
                if (callback != null) {
                    callback(null);
                }
                return;
            }
            let node = cc.instantiate<cc.Node>(res);
            let ui = node.getComponent(EditableComponentUI);
            node.parent = fatherNode;

            let editableCount = LocalStorageUtils.getNumber(LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
            LocalStorageUtils.setNumber(LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
            var conf = new EditableComponentUIConfigure(LocalStorageEnum.EDITABLE_UI_PREFIX.concat(editableCount.toString()));
            conf.fatherUI = fatherUI;
            conf.parentNodePath = path;
            conf.pos = node.position;
            conf.scale = node.scale;
            conf.uiname = componentName;
            conf.Save();
            ui.Conf = conf;
            ui.show(null);
            if(callback != null){
                callback(ui);
            }
        });
    }
}