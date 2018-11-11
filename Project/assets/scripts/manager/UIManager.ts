import UIBase from "../ui/UIBase";
import { UINameEnum } from "../enum/UINameEnum";
import { GloableConstantUtils } from "../tools/GloableConstantUtils";
import { ResourcesManager } from "./ResourcesManager";

//TODO:因为每个UI需要在UINameEnum中定义其名称并保持脚本名与prefab名字相同，所以最好能用工具实现重复性工作
/**
 * UI管理单例类
 * 所有UI继承UIBase并通过UIManager来调用显示或隐藏
 */
export class UIManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new UIManager();
    private constructor() { }
    /**
     * canvas
     */
    private canvas: cc.Canvas;
    /**
     * Canvas
     */
    public get Canvas(): cc.Canvas {
        return this.canvas;
    }
    /**
     * UI字典
     * @param key UI层级
     */
    private uiDictionary: Array<UIBase>;
    /**
     * 初始化
     */
    public Init(): void {
        this.canvas = cc.Canvas.instance;
        this.uiDictionary = new Array<UIBase>();
    }
    /**
     * (创建)显示UI
     * 注意初始化执行顺序
     * onLoad -> onEnable -> show -> callBack -> start
     * 其中onLoad, onEnable, start三个函数在prefab隐藏状态下不会被执行,show, callBack会执行
     * onEnable, start两个函数在prefab显示而component隐藏的状态下不会被执行,onLoad, show, callBack会执行
     * @param uiName UI名称
     * @param callBack 回调
     */
    public ShowUI(uiName: UINameEnum, callBack: (error?: Error, component?: UIBase) => void = null, parent: cc.Node = this.canvas.node) {
        Logger.log(`ShowUI ${uiName}`, "UIManager");
        if (this.uiDictionary[uiName] == undefined) {
            this.uiDictionary[uiName] = null;
            ResourcesManager.Instance.loadRes(GloableConstantUtils.UIPrefabPath.concat(uiName), (error, res) => {
                if (error != null) {
                    (callBack != null) && callBack(error, null);
                    return;
                }
                let node = cc.instantiate<cc.Node>(res);
                this.uiDictionary[uiName] = node.getComponent(uiName);
                node.parent = parent;
                if (this.uiDictionary[uiName] == null) {
                    Logger.error(`Get null component from the ui named "${uiName}"`, "UIManager");
                    (callBack != null) && callBack(new Error(`Get null component from the ui named "${uiName}"`), null);
                } else {
                    this.uiDictionary[uiName].init();
                    this.uiDictionary[uiName].show();
                    (callBack != null) && callBack(null, this.uiDictionary[uiName]);
                }
            });
        } else if (this.uiDictionary[uiName] == null) {
            Logger.error(`There are many places attempt to show the same UI "${uiName}"`, "UIManager");
            (callBack != null) && callBack(new Error(`There are many places attempt to show the same UI "${uiName}"`), null);
        } else {
            this.uiDictionary[uiName].show();
            (callBack != null) && callBack(null, this.uiDictionary[uiName]);
        }
    }

    /**
     * 隐藏UI
     * @param uiName UI名字
     */
    public HideUI(uiName: UINameEnum) {
        Logger.log(`HideUI ${uiName}`, "UIManager");
        if (this.uiDictionary[uiName] == undefined || this.uiDictionary[uiName] == null) {
            return;
        } else {
            this.uiDictionary[uiName].hide();
        }
    }

    /**
     * 获取UI
     * @param uiName UI名字
     */
    public GetUI(uiName: UINameEnum) {
        return this.uiDictionary[uiName];
    }

    /**
     * 销毁UI
     * @param uiName UI名字
     */
    public DestroyUI(uiName: UINameEnum) {
        if (this.uiDictionary[uiName] != undefined && cc.isValid(this.uiDictionary[uiName]) == true) {
            this.uiDictionary[uiName].node.destroy();
            this.uiDictionary[uiName] = undefined;
        }
    }

    /**
     * 销毁所有UI
     * @param uiName UI名字
     */
    public DestroyAll() {
        while (this.uiDictionary.length > 0) {
            let ui = this.uiDictionary.pop();
            ui != null && ui != undefined && ui.node.destroy();
        }
        cc.loader.releaseAll();
    }
}