namespace ECS {
    export abstract class ScriptBehaviourManager {
        
        private _entities : Array<number>;
        public get entities() : Array<number> {
            return this._entities;
        }
        public set entities(v : Array<number>) {
            this._entities = v;
        }
        
        abstract InternalUpdate(): void;
        public Update(): void {
            //...
            this.InternalUpdate();
            //...
        }
    }
    Object.seal(ScriptBehaviourManager.prototype.Update);
}
if(!(<any>window).ECS) (<any>window).ECS = {}; 
(<any>window).ECS.ScriptBehaviourManager = ECS.ScriptBehaviourManager;