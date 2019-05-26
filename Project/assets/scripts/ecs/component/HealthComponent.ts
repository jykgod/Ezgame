/**
 * 生命组件
 * 用来绑定在一些有生命的物体上面
 */
export default class HealthComponent implements ECS.IComponentData {
    private _hp: number = -1;
    private _dirty: boolean = false;
    public get HP(): number {
        return this._hp;
    }
    public set HP(v: number) {
        if (this._hp == v) return;
        this._hp = v;
        this._dirty = true;
    }
    public get dirty(): boolean {
        return this._dirty;
    }
    public set dirty(v: boolean) {
        this._dirty = v;
    }
}