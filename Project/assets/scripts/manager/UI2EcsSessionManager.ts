import UIProto from "../struct/UIProto";
import UISessionData from "../ecs/sharedComponent/UISessionDate";

/**
 * ui层使用的ui与ecs系统的会话管理类
 */
export class UI2EcsSessionManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new UI2EcsSessionManager();
    private constructor() { }

    public Init() {

    }

    public Send(proto: UIProto){
        UISessionData.instance.UI2ECSProtos.Enqueue(proto);
    }

    public Update(dt: number){
        while(UISessionData.instance.ECS2UIProtos.count > 0){
            let proto = UISessionData.instance.ECS2UIProtos.Dequeue();
        }
    }
}