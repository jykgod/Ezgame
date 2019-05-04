import UIProto from "../../struct/UIProto";

export default class UISessionData implements ECS.ISharedComponentData{
    public static instance: UISessionData;
    public ECS2UIProtos: Tools.Queue<UIProto> = new Tools.Queue<UIProto>();
    public UI2ECSProtos: Tools.Queue<UIProto> = new Tools.Queue<UIProto>();
}