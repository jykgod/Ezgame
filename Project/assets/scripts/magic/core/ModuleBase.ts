namespace Magic.Core{
    export class ModuleBase{
        public Input: Slot[];
        public Output: Slot[];
        public InDegree: number;
        public OutDegree: number;

        public Run(): Action{
            return null;
        }

        public static Link(slotA: Slot,slotB: Slot){

        }
    }
}