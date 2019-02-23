import { UIProtoTypeEnum } from "../enum/UIProtoTypeEnum";

//ECS逻辑系统与UI系统交互时使用的协议
export default class UIProto {
    public type: UIProtoTypeEnum;
    public params: object[];
    public date: Date;
    public time: number;
    constructor(type: UIProtoTypeEnum, ...params: object[]) {
        this.type = type;
        this.date = TimeManager.Instance.GetDateTime();
        this.time = TimeManager.Instance.realTimeSinceStartScene;
        this.params = params;
    }
}