/// <reference path="./ScriptBehaviourManager.ts"/>
namespace ECS {
    /**
     * Behaviour
     * 
     * 注：
     * 1.禁止包含命名为ctypes和cnames的成员
     * 2.声明组件数组变量时需要使用装饰器inject
     * 例:
     * @ECS.inject(TestComponent)
     * x: TestComponent;
     * @ECS.inject(PositionComponent)
     * y: PositionComponent;
     * 3.因为所有实体其实是公用的一个behavior实例，所以在定义变量的时候一定要小心！
     */
    export abstract class ComponentBehaviour extends ScriptBehaviourManager {
        private entity: number;
        protected OnUpdate = null;
        public get Entity(): number {
            return this.entities[0];
        }

        InternalUpdate(): void {
            if (this.OnUpdate) {
                this.OnUpdate();
            }
        }
        public OnDestroy(): void {
        }
        public OnStart(): void {
        }
    }

    Object.seal(ComponentBehaviour.prototype.InternalUpdate);
}

if (!(<any>window).ECS) (<any>window).ECS = {};
(<any>window).ECS.ComponentBehaviour = ECS.ComponentBehaviour;