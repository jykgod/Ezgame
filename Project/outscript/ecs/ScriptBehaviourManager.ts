module ECS {
    export abstract class ScriptBehaviourManager {
        abstract InternalUpdate() : void;
        public Update(): void {
            //...
            this.InternalUpdate();
            //...
        }
    }
}