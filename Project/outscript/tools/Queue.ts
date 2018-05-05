namespace Tools {
    class QueueNode<T>{
        public data: T;
        public next: QueueNode<T> = null;
        public constructor(data: T) {
            this.data = data;
        }
    }
    /**
     * 队列
     * 只提供基本功能，进队、出队、查询大小、查询队头
     */
    export class Queue<T>{
        private _first: QueueNode<T>;
        private trail: QueueNode<T>;
        private _count: number = 0;
        /**
         * 获取队列里元素个数
         */
        public get first(): T {
            return this._first.data;
        }
        /**
         * 获取队列里元素个数
         */
        public get count(): number {
            return this._count;
        }
        /**
         * 构造函数
         */
        public constructor() {
            this._count = 0;
            this._first = this.trail = null;
        }
        /**
         * 向队尾添加元素
         * @param obj 添加的类容
         */
        public Enqueue(obj: T) {
            if (this._count == 0) {
                this._first = this.trail = new QueueNode<T>(obj);
            } else {
                this.trail.next = new QueueNode<T>(obj);
                this.trail = this.trail.next;
            }
            this._count++;
        }
        /**
         * 获取队头的元素
         * 并从队列中移除该元素
         */
        public Dequeue(): T {
            if (this._count == 0) {
                return null;
            }
            this._count--;
            let ret = this._first.data;
            this._first = this._first.next;
            return ret;
        }
    }
}