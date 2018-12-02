module SimCivil.Contract {
    export class ValueTupleFloat {
        public $type: string = "System.ValueTuple`2[[System.Single, mscorlib],[System.Single, mscorlib]], System.ValueTuple";
        public Item1: number;
        public Item2: number;

        constructor(value: { Item1: number, Item2: number }) {
            this.Item1 = +value.Item1.toPrecision(10);
            this.Item2 = +value.Item2.toPrecision(10);
        }
    }

    export class ValueTupleInt32 {
        public $type: string = "System.ValueTuple`2[[System.Int32, mscorlib],[System.Int32, mscorlib]], System.ValueTuple";
        public Item1: number;
        public Item2: number;

        constructor(value: { Item1: number, Item2: number }) {
            this.Item1 = +value.Item1.toPrecision(10);
            this.Item2 = +value.Item2.toPrecision(10);
        }
    }
}