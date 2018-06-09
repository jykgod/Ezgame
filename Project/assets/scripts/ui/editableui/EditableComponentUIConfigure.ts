import { ComponentUINameEnum } from "../../enum/ComponentUINameEnum";

/**
 * 可编辑UI的配置类
 */
export class EditableComponentUIConfigure extends LocalStorageBase{
    /**
     * 可编辑UI的名字
     */
    public uiname: string;
    /**
     * 父UI
     */
    public fatherUI: string;
    /**
     * 父节点的路径(从fatherUI开始)
     */
    public parentNodePath: string;
    /**
     * node的缩放
     */
    public scale: number;
    /**
     * node的位置
     */
    public pos: cc.Vec2;
    /**
     * 数据
     */
    public data: object;

    public clone(key:string): EditableComponentUIConfigure{
        let ret: EditableComponentUIConfigure = new EditableComponentUIConfigure(key);
        ret.uiname = this.uiname;
        ret.pos = this.pos;
        ret.scale = this.scale;
        ret.fatherUI = this.fatherUI;
        ret.parentNodePath = this.parentNodePath;
        ret.data =  this.data;
        return ret;
    }
}