/**
 * 可编辑UI的配置类
 */
export class EditableCompnentUIConfigure extends LocalStorageBase{
    public name: string;
    public fatherUI: string;
    /**
     * 父节点的路径(从fatherUI开始)
     */
    public parentNodePath: string;
    public scale: number;
    public pos: cc.Vec2;

    public clone(key:string): EditableCompnentUIConfigure{
        let ret: EditableCompnentUIConfigure = new EditableCompnentUIConfigure(key);
        ret.name = this.name;
        ret.pos = this.pos;
        ret.scale = this.scale;
        ret.fatherUI = this.fatherUI;
        return ret;
    }
}