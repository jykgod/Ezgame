module ECS {
    export class World {
        /**
         * 处于激活状态的world
         */
        private static _active: World;
        public static get active(): World {
            return this._active;
        }

        /**
         * 名字
         */
        private _name: string;
        public get name(): string {
            return this._name;
        }

        /**
         * 构造函数
         * @param name 命名
         */
        constructor(name: string) {
            this._name = name;
        }
    }
}