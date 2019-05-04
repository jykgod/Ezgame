import { UIProtoTypeEnum } from "../enum/UIProtoTypeEnum";

//ECS逻辑系统与UI系统交互时使用的协议
export default class UIProto {
    public type: UIProtoTypeEnum;
    public params: any[];
    public date: Date;
    public time: number;
    constructor(type: UIProtoTypeEnum, ...params: Array<any>) {
        this.type = type;
        this.date = TimeManager.Instance.GetDateTime();
        this.time = TimeManager.Instance.realTimeSinceStartScene;
        this.params = params;
    }
}