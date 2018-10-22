import { Entity } from "./Entity";

export class EntityManager {
    /**
    * 单例模式声明
    */
    public static readonly Instance = new EntityManager();
    private constructor() { }

    /**
     * 初始化
     */
    public init(): void {

    }

    public CreateEntity():Entity{
        return new Entity();
    }
}