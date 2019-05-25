export default class InputData implements ECS.ISharedComponentData{
    public static instance: InputData;
    public up: boolean;
    public down: boolean;
    public left: boolean;
    public right: boolean;
    public mouse_left: boolean;
    public mouse_right: boolean;
    public mousePosition: cc.Vec2;
    public e: boolean;
    public time: number;
}