module ECS {
    export class World {
        //static-----------------------------
        /**
         * 处于激活状态的world
         */
        private static _active: World;
        public static get active(): World {
            return this._active;
        }
        /**
         * world表
         */
        private static _worlds: Array<World> = new Array<World>();
        /**
         * 创建一个世界
         * @param name 名字
         */
        public static CreateAWorld(name: string): World {
            this.RemoveWorld(name);
            this._worlds[name] = new World(name);
            if (this._active == null) {
                this._active = this._worlds[name];
            }
            return this._worlds[name];
        }
        /**
         * 销毁一个world
         * @param name 名字
         */
        public static RemoveWorld(name: string) {
            if (this._worlds[name] == undefined) {
                return;
            }
            if (this._worlds[name] == this._active) {
                this._active = null;
            }
            this._worlds[name].destroy();
            this._worlds[name] = undefined;
        }
        /**
         * 激活一个world
         * 只有被激活的世界中的system的OnUpdate会被执行
         * 同时只会有一个被激活的世界
         * @param name 名字
         */
        public static SetActive(name: string) {
            this._active = this._worlds[name];
        }

        //not static--------------------------
        /**
         * 名字
         */
        private _name: string;
        public get name(): string {
            return this._name;
        }
        /**
         * 实体管理对象
         */
        private _entitisManager: EntitisManager;
        /**
         * 获取实体管理对象
         */
        public get EntitisManager(): EntitisManager {
            return this._entitisManager;
        }
        /**
         * 系统数组
         */
        private _systems: Array<ComponentSystem>;
        /**
         * 构造函数
         * @param name 命名
         */
        private constructor(name: string) {
            this._name = name;
            this._entitisManager = new EntitisManager();
            this._systems = new Array<ComponentSystem>();
        }
        /**
         * 析构函数
         */
        private destroy() {
            while(this._systems.length > 0){
                this._systems.pop().OnDestroy();
            }
        }
        /**
         * 帧执行函数
         */
        public update(): void {
            for (let i = 0; i < this._systems.length; i++) {
                this._systems[i].Update();
            }
        }
        /**
         * 添加系统
         * @param system 系统实例
         */
        public addSystem(system: typeof ComponentSystem): void {
            let obj: ComponentSystem = new system();
            Logger.info(obj);
            obj.OnStart();
            this._systems.push(obj);
        }
    }

    Object.seal(World.prototype.update);
    Object.seal(World.prototype.addSystem);
}