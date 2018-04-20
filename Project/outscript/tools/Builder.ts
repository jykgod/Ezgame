namespace Tools {
    /**
     * 构造器抽象类
     */
    export abstract class Builder<T>{
        /**
         * 构造对象实例
         */
        protected readonly instance: T;
        /**
         * 构造器构造方法(在需要构造对象的类中调用)
         * @param instance 构造对象实例
         */
        public constructor(instance: T) {
            this.instance = instance;
        }
        /**
         * 构造完成返回实例
         */
        public build(): T {
            return this.instance;
        }
    }
}