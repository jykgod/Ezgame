module ECS {
    export class Entity {
        public id: number;
        /**
         * id相同的实体则是同一个实体
         * @param entity 用于比较的实体
         */
        public Equals(entity: Entity | object): boolean{
            if(entity == null || entity == undefined) return false;
            if(this.id == (<Entity>entity).id){
                return true;
            }
            return false;
        }
    }
}