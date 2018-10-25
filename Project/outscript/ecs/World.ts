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
         * 创建一个世界
         * @param name 名字
         */
        public static CreateAWorld(name: string): World {
            return new World(name); 
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
            return null;
        }

        /**
         * 构造函数
         * @param name 命名
         */
        private constructor(name: string) {
            this._name = name;
            this._entitisManager = new EntitisManager();
        }


    }
}