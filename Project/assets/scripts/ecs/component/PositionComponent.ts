/**
 * 位置组件
 */
export default class PositionComponent implements ECS.IComponentData {
    private _position: cc.Vec2 = cc.Vec2.ZERO;
    private _dirty: boolean = true;

    public get position(): cc.Vec2 {
        return this._position;
    }

    public set position(v: cc.Vec2) {
        if (v == this._position) return;
        this._position = v;
        this._dirty = true;
    }

    // public set targetPosition(v: cc.Vec2) {
    //     if (v == this._targetPosition) return;
    //     this._targetPosition = v;
    //     this._dirty = true;
    // }

    // public get targetPosition(): cc.Vec2 {
    //     return this._targetPosition;
    // }

    public get dirty(): boolean {
        return this._dirty;
    }

    public set dirty(v: boolean) {
        this._dirty = v;
    }
}