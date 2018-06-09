import UIBase from "../UIBase";
import { GloableUtils } from "../../tools/GloableUtils";
import { UINameEnum } from "../../enum/UINameEnum";
import { EditableComponentUIConfigure } from "./EditableComponentUIConfigure";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum";
import { UIManager } from "../../manager/UIManager";
import { EditableComponentUIManager } from "../../manager/EditableComponentUIManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { EditableComponentUIContainer } from "./EditableComponentContainer";

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
        return this.conf.Key();
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
     * 长按进入编辑模式需要花费的时间
     */
    private readonly pressEnterEditModeDeltaTime = 1;
    /**
     * 是不是正在边界UI
     */
    private editing: boolean;
    public get Editing(): boolean {
        return this.editing;
    }
    /**
     * 点击次数
     */
    private clickTimes: number;
    /**
     * 上一次按下时间
     */
    private lastOnPressTimes;
    /**
     * 处于点击的状态
     */
    private onPressing: boolean;
    /**
     * 编辑UI
     */
    private editUI: cc.Node;
    /**
     * 在onload注册回调
     */
    onLoad() {
        Logger.log('onload', 'EditableComponentUI');
        this.clickTimes = 0;
        this.onPressing = false;
        this.editing = false;
        this.lastOnPressTimes = 0;
        let bound = this.node.getBoundingBoxToWorld();
        // Logger.log(bound.width, this.name);
        this.node.width = bound.width;
        this.node.height = bound.height;
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => { this.onPressEditCallBack(event) });
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => { this.onReleaseEditCallBack(event) });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => { this.onMoveEditCallBack(event) });
    }
    /**
     * 按下鼠标/手指响应
     */
    private onPressEditCallBack(event) {
        if (this.editing == false) {
            this.onPressNotEditing(event);
        } else {
            this.onPressEditing(event);
        }
        this.lastOnPressTimes = TimeManager.Instance.realTimeSinceStartScene;
        this.onPressing = true;
    }
    /**
     * 移动鼠标/手指响应
     */
    private onMoveEditCallBack(event) {
        if (this.editing == false) {
            this.onMoveNotEditing(event);
        } else {
            this.onMoveEditing(event);
        }
    }
    /**
     * 抬起鼠标/手指响应
     */
    private onReleaseEditCallBack(event) {
        if (this.editing == false) {
            this.onReleaseNotEditing(event);
        } else {
            this.onReleaseEditing(event);
        }
        this.onPressing = false;
    }
    //---------------------辑模式下的时间响应------------------------
    private onPressEditing(event) {
        Logger.log('onPressEditing', 'EditableComponentUI');
    }
    private onReleaseEditing(event) {
        Logger.log('onReleaseEditing', 'EditableComponentUI');
    }
    private onMoveEditing(event: cc.Event.EventTouch) {
        if (this.onPressing == true) {
            Logger.log('onMoveEditing', 'EditableComponentUI');
            this.node.position = this.node.position.add(event.getDelta());
        }
    }
    //--------------------------------------------------------------
    //---------------------非编辑模式下的时间响应---------------------
    private onPressNotEditing(event) {
        Logger.log('onPressNotEditing', 'EditableComponentUI');
    }
    private onReleaseNotEditing(event) {
        Logger.log('onReleaseNotEditing', 'EditableComponentUI');
    }
    private onMoveNotEditing(event) {
        Logger.log('onMoveNotEditing', 'EditableComponentUI');
    }
    //--------------------------------------------------------------
    /**
     * 在update里面判断是不是长按进入了编辑模式
     */
    update() {
        if (this.editing == false &&
            this.onPressing == true &&
            TimeManager.Instance.realTimeSinceStartScene - this.lastOnPressTimes > this.pressEnterEditModeDeltaTime) {
            this.onPressing = false;
            if (this.editUI == null || this.editUI == undefined) {
                cc.loader.loadRes(GloableConstantUtils.UIPrefabPath.concat(UINameEnum.EDITE_UI), (error, res) => {
                    if (error != null) {
                        this.editing = false;
                        return;
                    }
                    this.editing = true;
                    this.editUI = cc.instantiate<cc.Node>(res);
                    this.editUI.width = this.node.width;
                    this.editUI.height = this.node.height;
                    this.editUI.parent = this.node;
                    let layout = this.editUI.getChildByName('Layout');
                    //注册点击事件
                    let eventHandler = new cc.Component.EventHandler();
                    eventHandler.target = this.node;
                    eventHandler.component = 'EditableComponentUI';
                    eventHandler.handler = 'save';
                    layout.getChildByName('ok').getComponent(cc.Button).clickEvents.push(eventHandler);
                    eventHandler = new cc.Component.EventHandler();
                    eventHandler.target = this.node;
                    eventHandler.component = 'EditableComponentUI';
                    eventHandler.handler = 'cancel';
                    layout.getChildByName('cancel').getComponent(cc.Button).clickEvents.push(eventHandler);
                    eventHandler = new cc.Component.EventHandler();
                    eventHandler.target = this.node;
                    eventHandler.component = 'EditableComponentUI';
                    eventHandler.handler = 'copy';
                    layout.getChildByName('add').getComponent(cc.Button).clickEvents.push(eventHandler);
                });
            } else {
                this.editing = true;
                this.editUI.active = true;
            }
        }
    }
    /**
     * 取消编辑
     */
    public cancel() {
        this.resetUIStateByConfig();
        this.editing = false;
        if (this.editUI != null && this.editUI != undefined) {
            this.editUI.active = false;
        }
    }
    /**
     * 复制UI
     */
    public copy() {
        this.clone((ui) => {
            this.editing = false;
            if (this.editUI != null && this.editUI != undefined) {
                if(this.fatherUI != null && this.fatherUI != undefined){
                    let container = this.fatherUI.node.getComponent(EditableComponentUIContainer);
                    this.editUI.active = false;
                    container.addSubUI(ui);
                }
            }
        });
    }
    /**
     * 保存编辑
     */
    public save() {
        if (this.editUI != null && this.editUI != undefined) {
            this.editUI.active = false;
        }
        this.editing = false;
        if (this.fatherUI == null || this.fatherUI == undefined) return;
        let father = UIManager.Instance.GetUI(this.conf.fatherUI as UINameEnum);
        this.conf.parentNodePath = GloableUtils.GetNodePath(this.fatherUI.node, this.node.parent);
        this.conf.scale = this.node.scale;
        this.conf.pos = this.node.position;
        Logger.info(this.conf);
        this.conf.Save();
    }
    /**
     * 克隆出一个一样的UI
     */
    protected clone(callback: (ui: EditableComponentUI) => void) {
        let editableCount = LocalStorageUtils.getNumber(LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
        LocalStorageUtils.setNumber(LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
        var conf = this.conf.clone(LocalStorageEnum.EDITABLE_UI_PREFIX.concat(editableCount.toString()));
        Logger.info(conf);
        conf.pos = conf.pos.add(cc.Vec2.RIGHT.mul(this.node.width));
        conf.Save();
        EditableComponentUIManager.Instance.LoadEditableComponentUI(conf.Key(), callback);
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
        Logger.info(this.node);
        return true;
    }

    public set Conf(conf: EditableComponentUIConfigure) {
        this.conf = conf;
        if (conf != null && conf != undefined) {
            this.conf.pos = cc.v2(this.conf.pos.x, this.conf.pos.y);
            this.conf.clone = EditableComponentUIConfigure.prototype.clone;
        }
    }

    public show(data: object) {

    }

    public delate() {

    }

    public hide() {

    }
}