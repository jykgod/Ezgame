/// <reference path="./ScriptBehaviourManager.ts"/>
module ECS {
    export abstract class ComponentSystem extends ScriptBehaviourManager {
        InternalUpdate(): void {
            this.OnUpdate();
        }

        protected abstract OnUpdate(): void;
    }

    Object.seal(ComponentSystem.prototype.InternalUpdate);
}