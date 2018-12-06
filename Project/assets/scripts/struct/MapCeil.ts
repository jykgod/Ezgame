export default class MapCeil{
    /**
     * 地图的类型
     * grass
     */
    private _type : number;
    public get type() : number {
        return this._type;
    }
    /**
     * 地图块id
     * 相同id的地块将会渲染为同一层次
     */
    private _id : number;
    public get id() : number {
        return this._id;
    }
    

    public constructor (type: number, id: number){
        this._type = type;
        this._id = id;
    }
}