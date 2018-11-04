module ECS {
    export class EntitisManager {
        /**
         * 给下一个新组件类型分配的ID
         */
        private static _componentTypeIdTop: number = 0;
        /**
         * 以组件类型id为键的邻接表
         * _components[i][j]中i表示组件类型id，j仅仅代表一个下标,其数据则是实体id
         */
        private _components: Array<Array<number>>;
        /**
         * 给下一个实体分配的ID
         */
        private _entitiIDTop: number;
        /**
         * 实体列表
         */
        private _entities: Array<number>;
        /**
         * 实体所拥有的组件
         */
        private _entitisComponents: Array<Array<IComponentData>>;

        public constructor() {
            this._entitiIDTop = 0;
            this._entities = new Array<number>();
            this._components = new Array<Array<number>>();
            this._entitisComponents = new Array<Array<IComponentData>>();
        }

        /**
         * 给实体添加组件(暂时不对重复添加组件做处理)
         * @param entity 实体
         * @param componentDataType 组件
         */
        public addComponent(entity: number, ...componentDataType: Function[]) {
            if (entity == null || entity == undefined) {
                return;
            }
            for (let i = 0; i < componentDataType.length; i++) {
                if (componentDataType[i].typeID == undefined) {
                    componentDataType[i].typeID = EntitisManager._componentTypeIdTop
                    this._components[EntitisManager._componentTypeIdTop] = new Array<number>();
                    EntitisManager._componentTypeIdTop++;
                }
                let typeID = componentDataType[i].typeID;
                let component_entities = this._components[typeID];
                let j;
                for (j = component_entities.length - 1; j >= 0; j--) {
                    if (component_entities[j] < entity) {
                        component_entities[j + 1] = entity;
                        break;
                    } else {
                        component_entities[j + 1] = component_entities[j];
                    }
                }
                if (j == -1) {
                    component_entities[0] = entity;
                }
                let component = new componentDataType[i]();
                this._entitisComponents[entity].push(component);
            }
        }

        /**
         * 添加公有组件
         * @param sharedComponentType 组件
         */
        public addSharedComponent(...sharedComponentType: Function[]) {
            for (let i = 0; i < sharedComponentType.length; i++) {
                if (sharedComponentType[i].instance == undefined) {
                    sharedComponentType[i].instance = new sharedComponentType[i]();
                }
            }
        }

        /**
         * 创建一个实体
         */
        public CreateAEntity(): number {
            this._entitisComponents[this._entitiIDTop] = new Array<IComponentData>();
            this._entities[this._entities.length] = this._entitiIDTop;
            return this._entitiIDTop++;
        }

        /**
         * 删除实体上的某些类型的组件
         * 这里用的splice方法。效率不高！
         * @param entity 实体
         * @param componentDataType 组件
         */
        public removeComponent(entity: number, ...componentDataType: Function[]) {
            for (let i = 0; i < componentDataType.length; i++) {
                let temp = this._components[componentDataType[i].typeID];
                let index = temp.indexOf(entity);
                if (index >= 0) {
                    temp.splice(temp.indexOf(entity), 1);
                }
                for (let j = 0; j < this._entitisComponents[entity].length; j++) {
                    if (this._entitisComponents[entity][j] instanceof (componentDataType[i])) {
                        this._entitisComponents[entity].splice(j, 1);
                        break;
                    }
                }
            }
        }

        /**
         * 删除实体上的某些类型的共享组件
         * @param entity 实体
         * @param componentDataType 组件
         */
        public removeSharedComponent(...sharedComponentType: Function[]) {
            for (let i = 0; i < sharedComponentType.length; i++) {
                componentDataType[i].instance = undefined;
            }
        }

        /**
         * 删除一个实体
         */
        public RemoveAEntity(entity: number) {
            for (let i = 0; i < this._components.length; i++) {
                let temp = this._components[i];
                let index = temp.indexOf(entity);
                if (index >= 0) {
                    temp.splice(index, 1);
                }
            }

            let index = this._entities.indexOf(entity);
            if (index >= 0){
                this._entities.splice(index, 1);
            }

            this._entitisComponents[entity] = undefined;
        }

        /**
         * 获取满足条件的实体,时间复杂度O(n*m)，n是组件个数，m是组件类型数
         * TODO:需要实现一个用于按某种排序规则进行插入排序或堆排序后取出实体的方法，某些情况下可以增加效率。
         *      比如对Graphic组件中的layer排序。
         * @param componentDataType 
         */
        public GetEntities(...componentDataType: Function[]): Array<number>{
            if (componentDataType == null || componentDataType == undefined || componentDataType.length == 0) {
                return this._entities;
            }
            let ret = new Array<number>();
            let i = new Array<number>();
            let max = 0;
            for (let loop = 0; loop < componentDataType.length; loop++) {
                if (this._components[componentDataType[loop].typeID] == undefined || this._components[componentDataType[loop].typeID] == null) return null;
                i[loop] = 0;
                max = Math.max(max, this._components[componentDataType[loop].typeID][0]);
            }
            while (true) {
                for (let loop = 0; loop < componentDataType.length; loop++) {
                    while (this._components[componentDataType[loop].typeID][i[loop]] < max) {
                        i[loop]++;
                        if (i[loop] >= this._components[componentDataType[loop].typeID].length) {
                            return ret;
                        }
                        max = Math.max(max, this._components[componentDataType[loop].typeID][i[loop]]);
                    }
                }
                let f = true;
                for (let loop = 0; loop < componentDataType.length; loop++) {
                    if (this._components[componentDataType[loop].typeID][i[loop]] < max) {
                        f = false;
                        break;
                    }
                }
                if (f == true) {
                    ret.push(max);
                    max += 1;
                }
            }
            return ret;
        }
    }
}