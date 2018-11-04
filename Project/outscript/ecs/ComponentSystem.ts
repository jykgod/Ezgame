/// <reference path="./ScriptBehaviourManager.ts"/>
module ECS {
    /**
     * 系统
     * 
     * 注：
     * 1.禁止包含命名为ctypes和cnames的成员
     * 2.声明组件数组变量时需要使用装饰器inject
     * 例:
     * @ECS.inject(TestComponent)
     * x: Array<TestComponent>;
     * @ECS.inject(PositionComponent)
     * y: Array<PositionComponent>;
     * 需要注意的是这里声明的数组（上面例子中的x和y）每次update的时候会是一个新的实例。
     */
    export abstract class ComponentSystem extends ScriptBehaviourManager {
        InternalUpdate(): void {
            this.OnUpdate();
        }

        protected abstract OnUpdate(): void;
        public OnDestroy(): void{
        }
        public OnStart(): void{
        }
    }

    Object.seal(ComponentSystem.prototype.InternalUpdate);

    export function inject(type: IComponentData){
        return function (target: any, propertyName: string) {
            if(target.ctypes == undefined){
                target.ctypes = new Array<IComponentData>();
                target.cnames = new Array<string>();
            }
            target.ctypes.push(type);
            target.cnames.push(propertyName);
            Logger.log(target.cnames, "inject");
        }
    }
}