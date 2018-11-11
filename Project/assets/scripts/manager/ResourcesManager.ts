import { UINameEnum } from "../enum/UINameEnum";

export class ResourcesManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new ResourcesManager();
    private constructor() { }

    public Init(){

    }

    public loadRes(path: string, callback: (error: Error, resource: any)=>void){
        cc.loader.loadRes(path, callback);
    }
}