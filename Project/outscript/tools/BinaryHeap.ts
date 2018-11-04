namespace Tools {
    /**
     * 二叉堆
     */
    export class BinaryHeap<T>{
        private _arr: Array<T>;
        private _count: number = 0;
        private _compare: (a: T, b: T) => boolean;

        /**
         * 构造函数
         * @param compare 排序函数返回true表示a应该排在b上面，否则b在a上面
         */
        public constructor(compare: (a: T, b: T) => boolean) {
            this._compare = compare;
            this._arr = new Array<T>();
        }

        /**
         * 从末尾向上整理数据
         * @param startPos 起始点
         */
        private upTree() {
            let startPos = this._count - 1;
            let f = 0;
            let t = null;
            while (startPos > 0) {
                f = (startPos - 1) >> 1;
                if (this._compare(this._arr[startPos], this._arr[f])) {
                    t = this._arr[f];
                    this._arr[f] = this._arr[startPos];
                    this._arr[startPos] = t;
                    startPos = f;
                } else {
                    break;
                }
            }
        }

        /**
         * 从起始点向下整理数据
         * @param startPos 起始点
         */
        private downTree(startPos: number) {
            let lch = 0;
            let rch = 0;
            let minch = 0;
            let t = null;
            while (startPos < this._count) {
                lch = startPos * 2 + 1;
                if (lch >= this._count) {
                    return;
                }
                rch = startPos * 2 + 2;
                minch = (rch >= this._count || this._compare(this._arr[lch], this._arr[rch])) ? lch : rch;
                if (this._compare(this._arr[minch], this._arr[startPos])) {
                    t = this._arr[minch];
                    this._arr[minch] = this._arr[startPos];
                    this._arr[startPos] = t;
                    startPos = minch;
                } else {
                    break;
                }
            }
        }

        /**
         * 删除一个任意位置的数据(时间复杂度O(n)+O(log(n)))
         * @param t 数据
         */
        public Remove(t: T) {
            for (let i = 0; i < this._count; i++) {
                if (this._arr[i] === t) {
                    this._arr[i] = this._arr[this._count - 1];
                    this._count--;
                    this.downTree(i);
                    return;
                }
            }
        }

        /**
         * 添加一个数据(时间复杂度O(log(n)))
         * @param t 数据
         */
        public Push(t: T) {
            this._arr[this._count] = t;
            this._count++;
            this.upTree();
        }

        /**
         * 取出顶端数据并将其删除(时间复杂度O(log(n)))
         */
        public Pop(): T {
            if (this._count == 0) {
                return null;
            }
            let ret = this._arr[0];
            this._count--;
            this._arr[0] = this._arr[this._count];
            this.downTree(0);
            return ret;
        }

        /**
         * 取出堆排序后的数组(时间复杂度O(n*log(n) + O(n)));
         */
        public GetSortArray(): Array<T> {
            let ret = new Array<T>();
            let c = 0;
            while (this._count > 0) {
                ret[c] = this._arr[0];
                this._count--;
                this._arr[0] = this._arr[this._count];
                this.downTree(0);
                this._arr[this._count] = ret[c];
                c++;
            }
            this._count = c;
            c = c >> 1;
            for (let i = 0; i < c; i++) {
                let t = this._arr[i];
                this._arr[i] = this._arr[this._count - i - 1];
                this._arr[this._count - i - 1] = t;
            }
            return ret;
        }
    }
}