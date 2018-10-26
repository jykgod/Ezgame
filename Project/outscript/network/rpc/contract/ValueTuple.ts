module SimCivil.Contract {
    export class ValueTuple {
        public $type: string = "System.ValueTuple`2[[System.Single, System.Private.CoreLib],[System.Single, System.Private.CoreLib]], System.Private.CoreLib";
        public Item1: number;
        public Item2: number;

        constructor(value: { Item1: number, Item2: number }) {
            this.Item1 = value.Item1;
            this.Item2 = value.Item2;
        }
    }
}