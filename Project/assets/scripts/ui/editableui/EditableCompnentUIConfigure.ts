import { ComponentUINameEnum } from "../../enum/ComponentUINameEnum";

/**
 * 可编辑UI的配置类
 */
export class EditableCompnentUIConfigure extends LocalStorageBase{
    public uiname: ComponentUINameEnum;
    public fatherUI: string;
    /**
     * 父节点的路径(从fatherUI开始)
     */
    public parentNodePath: string;
    public scale: number;
    public pos: cc.Vec2;

    public clone(key:string): EditableCompnentUIConfigure{
        let ret: EditableCompnentUIConfigure = new EditableCompnentUIConfigure(key);
        ret.uiname = this.uiname;
        ret.pos = this.pos;
        ret.scale = this.scale;
        ret.fatherUI = this.fatherUI;
        return ret;
    }
}