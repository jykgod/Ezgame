export class EcsUtility{
    public static GotRole:boolean = false;
    public static RegisterViewSyncOpt:Promise<void>;
    public static InitedViewSyncSystem:boolean;
    public static LastSyncMotionTime:Date;
    public static LogicToUIRatio:number = 50;
}